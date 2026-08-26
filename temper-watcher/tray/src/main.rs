#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod installer;
mod logger;
mod supervisor;
mod tray;
mod updater;

use std::path::PathBuf;

use directories::BaseDirs;
use winit::event_loop::EventLoop;

use crate::installer::{bootstrap_worker_if_missing, ensure_autostart_shortcut, worker_path};
use crate::logger::{log_error, log_info};
use crate::supervisor::Supervisor;
use crate::tray::{install_event_handlers, resolve_saved_vars_dir, TrayApp, UserEvent};
use crate::updater::{check_and_apply_tray_update, cleanup_old_tray, install_dir, UpdateOutcome};

const WATCHER_VERSION: &str = env!("WATCHER_VERSION");
const SERVER_URL: &str = env!("SERVER_URL");

fn worker_log_path() -> PathBuf {
    BaseDirs::new()
        .map(|b| b.data_local_dir().join("TemperWatcher").join("watcher.log"))
        .unwrap_or_else(|| PathBuf::from("watcher.log"))
}

fn main() {
    log_info(&format!(
        "Tray starting. version={WATCHER_VERSION} server={SERVER_URL}"
    ));

    let dir = install_dir();
    log_info(&format!("Install dir: {}.", dir.display()));

    cleanup_old_tray(&dir);

    match check_and_apply_tray_update(SERVER_URL, WATCHER_VERSION, &dir) {
        UpdateOutcome::UpdateApplied => {
            log_info("Tray self-updated. Exiting; new tray launches at next login.");
            std::process::exit(0);
        }
        UpdateOutcome::UpToDate => {}
        UpdateOutcome::CheckFailed(msg) => {
            log_error(&format!("Self-update check failed: {msg}"));
        }
    }

    if let Err(e) = bootstrap_worker_if_missing(SERVER_URL, &dir) {
        log_error(&format!("Worker bootstrap failed: {e}"));
    }

    let exe = std::env::current_exe().unwrap_or_else(|_| dir.join("temper-watcher.exe"));
    if let Err(e) = ensure_autostart_shortcut(&exe) {
        log_error(&format!("Autostart shortcut failed: {e}"));
    }

    let supervisor = Supervisor::new(&worker_path(&dir));
    if let Err(e) = supervisor.start() {
        log_error(&format!("Supervisor failed to start: {e}"));
    }

    let event_loop: EventLoop<UserEvent> = EventLoop::with_user_event()
        .build()
        .expect("Failed to build winit event loop");

    install_event_handlers(&event_loop);

    let mut app = TrayApp::new(
        WATCHER_VERSION.to_string(),
        supervisor,
        worker_log_path(),
        resolve_saved_vars_dir(),
    );

    if let Err(e) = event_loop.run_app(&mut app) {
        log_error(&format!("Event loop exited with error: {e}"));
    }

    log_info("Tray exiting cleanly.");
}

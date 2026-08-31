#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 09-monarch-tap-and-build-stamp.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  let changed = false;
  for (const cls of ["NativeAudioPlugin", "CrashCapturePlugin"]) {
    if (!cfg.packageClassList.includes(cls)) {
      cfg.packageClassList.push(cls);
      changed = true;
      console.log("OK: registered " + cls + " in packageClassList of " + p);
    } else {
      console.log("OK: " + cls + " already in packageClassList of " + p);
    }
  }
  if (changed) fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
' "$CONFIG"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "KeyboardAccessorySuppressorPlugin";
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  const has = cfg.packageClassList.includes(cls);
  if (enabled && !has) {
    cfg.packageClassList.push(cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: registered " + cls + " in packageClassList of " + p);
  } else if (!enabled && has) {
    cfg.packageClassList = cfg.packageClassList.filter((c) => c !== cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (suppressor disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$KEYBOARD_SUPPRESS_ENABLED"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "WidgetRefreshPlugin";
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  const has = cfg.packageClassList.includes(cls);
  if (enabled && !has) {
    cfg.packageClassList.push(cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: registered " + cls + " in packageClassList of " + p);
  } else if (!enabled && has) {
    cfg.packageClassList = cfg.packageClassList.filter((c) => c !== cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (widget-refresh disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$WIDGET_REFRESH_ENABLED"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "BadgePlugin";
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  const has = cfg.packageClassList.includes(cls);
  if (enabled && !has) {
    cfg.packageClassList.push(cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: registered " + cls + " in packageClassList of " + p);
  } else if (!enabled && has) {
    cfg.packageClassList = cfg.packageClassList.filter((c) => c !== cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (badge-set disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$BADGE_RESYNC_ENABLED"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "KokoroTtsPlugin";
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  const has = cfg.packageClassList.includes(cls);
  if (enabled && !has) {
    cfg.packageClassList.push(cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: registered " + cls + " in packageClassList of " + p);
  } else if (!enabled && has) {
    cfg.packageClassList = cfg.packageClassList.filter((c) => c !== cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (kokoro-tts disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$KOKORO_TTS_ENABLED"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "DeviceSecretPlugin";
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  const has = cfg.packageClassList.includes(cls);
  if (enabled && !has) {
    cfg.packageClassList.push(cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: registered " + cls + " in packageClassList of " + p);
  } else if (!enabled && has) {
    cfg.packageClassList = cfg.packageClassList.filter((c) => c !== cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (device-secret disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$DEVICE_SECRET_ENABLED"

node -e '
  const fs = require("fs");
  const p = process.argv[1];
  const enabled = process.argv[2] === "1";
  const cls = "MonarchRelayPlugin";
  const cfg = JSON.parse(fs.readFileSync(p, "utf8"));
  cfg.packageClassList = cfg.packageClassList || [];
  const has = cfg.packageClassList.includes(cls);
  if (enabled && !has) {
    cfg.packageClassList.push(cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: registered " + cls + " in packageClassList of " + p);
  } else if (!enabled && has) {
    cfg.packageClassList = cfg.packageClassList.filter((c) => c !== cls);
    fs.writeFileSync(p, JSON.stringify(cfg, null, 2) + "\n");
    console.log("OK: removed " + cls + " from packageClassList of " + p + " (monarch-tap disabled)");
  } else {
    console.log("OK: " + cls + (enabled ? " already in" : " absent from") + " packageClassList of " + p);
  }
' "$CONFIG" "$MONARCH_TAP_ENABLED"

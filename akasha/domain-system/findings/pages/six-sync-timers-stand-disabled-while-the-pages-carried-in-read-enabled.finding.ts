import type { Finding } from "../finding.page-type.ts"

export const sixSyncTimersStandDisabledWhileThePagesCarriedInReadEnabled = {
  id: "01a0683c-3c7f-7a03-9213-e21509ea260c",
  pageTypeSlug: "finding",
  slug: "six-sync-timers-stand-disabled-while-the-pages-carried-in-read-enabled",
  domainSlug: "domain/akasha-migration",
  claim:
    "Six workstation services carried into akasha today read `enabled: true` and carry a schedule, and their timers do not exist on the system: great-courses-sync, monarch-poll, monarch-sync, repos-empty-dir-purge, royal-road-sync and wandering-inn-sync. The pages were carried unchanged rather than flipped, because the swarm disabled these five hours ago to stop them writing into the repo mid-migration, and that is a pause rather than a decision about what the service is for.",
  evidence:
    "Measured 2026-09-03 10:35 to 10:50 MDT.\n\nTHE LIVE STATE. `systemctl --user show <u>.timer` answers LoadState=not-found for all six while `<u>.service` reads LoadState=loaded, UnitFileState=linked. The six .timer files still stand in ~/.local/state/workstation-services with mtimes of 2026-08-27 and 2026-08-27 10:55; only the symlinks under ~/.config/systemd/user were removed, which is what `systemctl --user disable` does.\n\nWHEN. The user journal reads `Stopped royal-road-sync.timer` at 06:56:13, then wandering-inn-sync, great-courses-sync and monarch-sync at 06:58:25, monarch-poll at 06:58:26, and repos-empty-dir-purge at 07:19:51, all on 2026-09-03.\n\nWHO AND WHY. `five-workstation-sync-timers-wrote-into-this-repo-beside-the-swarm` claims the first five and names the reason, and gives the two commands that put each back. `the-empty-directory-purge-guards-one-level-of-pages-and-nothing-inside-akasha` claims the sixth. `every-timer-reported-dropped-by-one-reload-was-turned-off-on-purpose` establishes that these were separate deliberate acts rather than one reload's collateral.\n\nWHAT WAS CARRIED. All six pages now stand under akasha/service-system/workstation-services/pages/ with enabled true and their schedules intact, so restoring them is `systemctl --user link` plus `enable --now`, or one `akasha service install` once the swarm is done. Only temper-watcher was flipped to false, on Alan's ruling that the watcher is stopped, and it reads inactive since 10:04:07.",
} as const satisfies Finding

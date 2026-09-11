import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const everySeatHoldsTheSameShareAndNothingHoldsTheLowerOne = {
  id: "01a09194-9c04-7dfb-9753-3d651d8bc17d",
  type: "finding",
  slug: "every-seat-holds-the-same-share-and-nothing-holds-the-lower-one",
  domain: "domain/cpu-limit",
  claim:
    "Nothing on the workstation tells a processor which work matters more, and the place to say it is already there and empty. Every seat scope and every workstation service holds cpu.weight 100, so a sweep competes evenly with the seat Alan is typing into. The desktop session already holds 500 against app.slice's 100, so the outer ranking is right and the inner one is flat. background.slice holds weight 30 and nothing runs in it.",
  evidence:
    "Read on 2026-09-11 under /sys/fs/cgroup/user.slice/user-1000.slice/user@1000.service.\n\ncpu.weight by cgroup:\n  the manager itself 500\n  session.slice 500\n  app.slice 100\n  user.slice 100\n  background.slice 30\n  init.scope 100\n  uresourced.service 100\n\nEvery child of app.slice read holds 100: all sixteen tmux-spawn seat scopes, memory-reaper.service, pages-service.service, day-readout-watch-service.service, temper-watcher.service, flatpak-session-helper.service and the akasha scopes.\n\nLifetime processor seconds from cpu.stat usage_usec show how uneven the work already is: one seat scope has burned 80421 seconds, another 54036, then 6842, 6012 and 4969, while memory-reaper.service has burned 479 and most services under 10.\n\nThe host has 24 processors. Load average at the reading was 17.18 over one minute, and /proc/pressure/cpu gave some avg10=7.65 with full at 0.\n\nbackground.slice is a cgroup systemd makes for exactly this ranking, and nothing places any unit into it.",
} as const satisfies Finding

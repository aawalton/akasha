import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const seatPeaksAddToFourTimesWhatTheHostEverHeldAtOnce = {
  id: "01a0917a-bf0e-7c4d-b72c-3aa1b90918e6",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "seat-peaks-add-to-four-times-what-the-host-ever-held-at-once",
  domain: "domain/memory-limit",
  claim:
    "Seats surge at different moments. The sixteen live seat scopes have lifetime peaks adding to 213.5 GiB, while the cgroup holding all of them together peaked at 55.5 GiB on a host of 62.2 GiB. So ceilings chosen to add up to what the host has would refuse work that never once conflicted, and a ceiling generous enough for a surging seat can be given to every seat at the same time.",
  evidence:
    "Read on 2026-09-11 from memory.peak, which every cgroup keeps as a lifetime high-water mark.\n\nThe sixteen tmux-spawn scopes under app.slice, peak per scope in GiB: 32.2, 31.7, 28.8, 26.8, 22.7, 18.6, 9.2, 8.6, 7.8, 6.3, 5.3, 3.7, 3.6, 3.5, 3.0, 1.7. These add to 213.5 GiB.\n\napp.slice, the parent of all sixteen, peaked at 59573080064 bytes, 55.5 GiB. A parent's peak bounds how much its children ever held together, so 55.5 GiB is an upper bound on what these seats reached at one moment rather than an estimate.\n\nMemTotal is 65180400 kB, 62.2 GiB.\n\nTen of the sixteen peaked under 10 GiB and six peaked past 18 GiB, so the shape is many small seats and a few that surge.\n\nThe scopes did not all begin at the same moment, so a scope's peak may be older than another's. That weakens no part of this, because app.slice has been there throughout and its own peak already holds every moment all sixteen shared.",
} as const satisfies Finding

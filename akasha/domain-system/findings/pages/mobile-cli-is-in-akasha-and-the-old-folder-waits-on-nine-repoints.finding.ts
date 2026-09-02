import type { Finding } from "../finding.page-type.ts"

export const mobileCliIsInAkashaAndTheOldFolderWaitsOnNineRepoints = {
  id: "01a05d24-7c1e-7a40-9f83-6b21d4e0a7c5",
  pageTypeSlug: "finding",
  slug: "mobile-cli-is-in-akasha-and-the-old-folder-waits-on-nine-repoints",
  domainSlug: "domain/alan-harness",
  claim:
    "mobile-cli is in akasha as 27 modules of code and did not answer identically. The write at 3e93955508 came before two fixes the live copy took the same morning, and the mirror at 4f674784e2 carried neither; both are repaired at d25ce2c766, and the copies now differ only by import path and by comments. The old folder waits on seven files outside akasha and three akasha shell scripts naming the new package.",
  evidence:
    "Measured at d25ce2c766 by recovering the 19 unit tests 09f964f5c5 deleted from `alanwalton/mobile-cli/src/lib/` and porting 18 beside the akasha modules, then diffing all 25 module pairs by hand: 223 tests over 18 files, all passing.\n\nTwo behaviour differences, both from one gap. akasha was written in at 07:00 on 2026-09-01; the live copy took a36d604ba0 at 08:21 and 9fc7ff54aa at 08:26; the mirror at 08:59 brought the build-number split and the token source but not these. The deploy script never put `rm -rf <macBuildLockDir>` on the cleanup stack, so a run dying before the upload left the lock for the next run to judge stale — `deploy-script.ts:73` against `testflight-deploy-script.module.code.ts:77`. The poll awaited each App Store Connect read bare, so one transient failure ended a forty-minute wait with an upload behind it; `NOT_YET_LISTED`, `POLL_READ_FAILURE_TOLERANCE` and `pollElapsed` were all absent. Ten new tests weigh the two, and all ten refused the old bodies.\n\n`cut-fingerprint` is the 28th module and is absent on purpose: a86ab2b802 severed it for reading a page type not moving in.\n\nEverything else differs only by import path, by comments `no-code-comments` bars, or by three deliberate swaps: `quoted` for `shellSingleQuote`, byte-identical; `said`/`shown` for `execFileSync`, same throw on non-zero; `Bun.sleep` for a hand-rolled sleep. `/tmp` to `/var/tmp` is a departure the ssh-delivery page states, and is the one change no test here reaches, the macbook being elsewhere.",
} as const satisfies Finding

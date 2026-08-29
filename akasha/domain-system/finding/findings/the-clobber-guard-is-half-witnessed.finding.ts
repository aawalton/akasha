import type { Finding } from "../finding.page-type.ts"

export const theClobberGuardIsHalfWitnessed = {
  id: "01a04bf5-74d0-7137-9af8-1af12a86de31",
  pageTypeSlug: "finding",
  slug: "the-clobber-guard-is-half-witnessed",
  domainSlug: "domain/command-system",
  claim:
    "The guard that refuses a call whose file moved under it is exercised where it decides and not where it is armed, so one line of it stands unwitnessed.",
  evidence:
    "The guard compares the bytes an edit read against the bytes on disk, inside the hold that landing takes immediately before writing, which is stronger than the reference: that one compares modification times, and outside any hold, so a rewrite fast enough to land in the same filesystem tick passes it. Bytes cannot miss that. The two tests that prove the refusal drive the landing path directly with recorded bytes that do and do not match disk, because a genuine interleaving cannot be manufactured inside one synchronous process. What they do not reach is edit recording those bytes in the first place, a single push whose absence would disarm the guard silently while both tests still passed. A window also remains open by construction, edit reading the body before the hold, so a file that moved is refused rather than clobbered but the call must be run again. Recorded because the guard is the only thing standing between two callers editing one file, and half of it is asserted by reading rather than by test.",
} as const satisfies Finding

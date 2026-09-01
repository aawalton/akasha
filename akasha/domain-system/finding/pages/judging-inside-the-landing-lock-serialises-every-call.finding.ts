import type { Finding } from "../finding.page-type.ts"

export const judgingInsideTheLandingLockSerialisesEveryCall = {
  id: "01a05dc5-89cf-7b5d-a91f-5ea8766026a9",
  pageTypeSlug: "finding",
  slug: "judging-inside-the-landing-lock-serialises-every-call",
  domainSlug: "workspace-package/command-system",
  claim:
    "The landing lock is held across judging as well as landing, so every write, edit and dry-run holds it for about 2.5 seconds of checks and about 0.3 seconds of the landing itself. Calls serialise behind one another, the wait is a race rather than a queue, and the unluckiest caller reaches the 120-second ceiling and is refused.",
  evidence:
    '`landing.module.code.ts:248` wraps the whole of `landing()` in `holding`, including `judged()`, which runs all 39 checks. The write, the index update and the commit are the last three calls inside it. `asking.module.code.ts:266` wraps `gate.over(change)` in `holding` as well, so `--dry-run`, whose whole purpose is to write nothing, takes the exclusive lock while it judges.\n\nMeasured on this checkout: bare command startup 0.02s; `--dry-run` 2.49s, 2.50s, 2.77s; a full write of an unchanged body 2.70s, 2.82s, 3.29s. Judging is therefore about 2.5s of every hold and the landing about 0.3 to 0.8s.\n\nSix concurrent `--dry-run` calls, none of which write anything, finished at +4.9, +6.8, +8.8, +10.6, +16.0 and +18.2 seconds. Fully serialised: 18.2 seconds for six calls that wrote nothing. The third worker lost five acquisitions in a row, because `holding()` waits by polling `openSync(path, "wx")` every 50ms with no queue and no fairness.\n\nAt 2.5s a turn, roughly 48 queued callers exhaust the 120s ceiling in `WAITED_AT_MOST`, and the caller refused is whichever lost the most races rather than whichever waited longest. This is how eight seats produced two refusals for one agent in a single morning.\n\nLines 285 to 296 already refuse when a commit reaching `akasha/` landed while the change was judged. That guard is written for a design where judging happens outside the lock; as arranged today both reads of HEAD happen inside it, so it can only catch a commit made by something that took no lock.',
} as const satisfies Finding

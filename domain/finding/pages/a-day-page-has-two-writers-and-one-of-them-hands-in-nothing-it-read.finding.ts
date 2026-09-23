import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const aDayPageHasTwoWritersAndOneOfThemHandsInNothingItRead = {
  id: "01a0cf08-5749-71ce-84bc-9d9b5c0038bb",
  type: "page-type/finding",
  slug: "a-day-page-has-two-writers-and-one-of-them-hands-in-nothing-it-read",
  domain: "domain/track",
  claim:
    "A day page is written by `akasha track session` and by `akasha music capture`, and only the second hands in the body it read, so a race between them either fails a service that could have composed again or is overwritten without a word.",
  evidence:
    "`music-capture.service` failed at 2026-09-23T16:00:57Z saying the day page for that day moved since the body handed in was composed, and to read it again and compose the body from what is there now. A session switch had landed on that page between `changesFor` reading it and the fold checking it. The next run filed everything, because a run takes the plays past the newest play already filed, so nothing was lost. The refusal states its own remedy and nothing carries it out: `changesFor` reads the body, `captured` hands it to the landing once, and a refusal is answered rather than composed again. Every caller of `runMechanicalChange` gives up on the first refusal. The other writer is worse placed: `changeAt` in `track-landing` hands in no `old` at all, so a session switch landing over a concurrent write to the same day page reverts it silently, which is the fault `nothing-records-what-a-landing-was-composed-against` was filed for. Composing again would be safe: the fold refuses before anything is written, `plannedOver` and `changesFor` are pure over the plays already fetched, and `filedIn` reads the disk again rather than answering from a memo, so a second try asks Spotify nothing and doubles nothing.",
} as const satisfies Finding

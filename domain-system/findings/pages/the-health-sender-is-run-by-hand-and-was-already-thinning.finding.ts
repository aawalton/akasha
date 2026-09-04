import type { Finding } from "../finding.page-type.ts"

export const theHealthSenderIsRunByHandAndWasAlreadyThinning = {
  id: "01a06243-0795-7634-935a-f21b75b9e57f",
  pageTypeSlug: "finding",
  slug: "the-health-sender-is-run-by-hand-and-was-already-thinning",
  domainSlug: "domain/alan-harness",
  claim:
    "Alan's health sender is run by hand rather than on a timer, and its arrivals were thinning well before they ended. The 23 arrival minutes from 08-09 to 08-23 fall at no repeating hour, and the last two gaps ran 2.8 and 4.2 days. Days of quiet were ordinary before 08-23, so ten days of it is not by itself a fault, and a run that never happened reads exactly like a run that failed.",
  evidence:
    "Counted 2026-09-02 over the `arrivedAt` values in `akasha/alan/eso-day/eso-daily-trackings/*/*.health-samples.jsonl`: 25 distinct minutes. Two of them, 2026-08-07T22:07 and 22:09, carry 11,522 and 46,984 samples, which is the workstation import off an export rather than the phone. The other 23 carry 1 to 514 samples each.\n\nTheir hours: 10, 10, 11, 15, 15, 15, 19 on 08-09; 17, 20, 21 on 08-10; 16, 20 on 08-11; 12 on 08-12; 03 on 08-13; 21, 21, 22 on 08-14; 00 on 08-15; 01, 01, 09 on 08-16; 04 on 08-19; 10 on 08-23. No hour repeats, so no timer fires this.\n\nThat agrees with `alanwalton-plist-keys` declaring `UIBackgroundModes` as audio alone, and with no part of the seam registering a background task. The intent runs when the phone is picked up.\n\nThe rate thinned: 5 arrivals on 08-09, 3 on 08-10, then one or two a day, then 08-16T09:51 to 08-19T04:56 with none, 2.8 days, then 08-19T04:56 to 08-23T10:05 with none, 4.2 days.\n\nThe last run was healthy. The newest `startedAt` anywhere is 2026-08-23T09:48:01Z, 17 minutes before that run's arrival, and the run carried 400 samples over the day files for 08-18 through 08-22.\n\n`sweep` sends the last 48 hours with no cursor wherever the anchored read sends nothing, so any run reaching the route lands rows. No arrival since 08-23T10:05 therefore means no run, or no run that reached the route, and nothing on either side of the wire tells those two apart today.",
} as const satisfies Finding

import type { Finding } from "../finding.page-type.ts"

export const theLandingLockRaceStarvesTheUnluckiestCallerUnderSaturation = {
  id: "01a06556-142b-7221-bffd-1449f1536cbe",
  pageTypeSlug: "finding",
  slug: "the-landing-lock-race-starves-the-unluckiest-caller-under-saturation",
  domainSlug: "workspace-package/command-system",
  claim:
    "The landing lock's wait is a race with no queue, so a caller that has waited long has no priority over one that just arrived. Forty processes each holding 250ms wait 0.75s at the median and 54.6s at the worst, which is 5.5 times what a fair queue would cost and 45 percent of the 120s ceiling. The lock is 7 percent busy in this checkout today, so the tail is latent rather than felt, and it grows with how long a busy period lasts rather than with how many callers there are.",
  evidence:
    "Holds were timed by polling the lock file from a separate process every 1ms and pairing each window with the caller's own clock, so no production code was changed to measure it.\n\nForty processes landing once each: hold 153ms mean, 176ms worst; worst wait 5,979ms against a packed drain of 5,967ms. Fair to within 12ms, because a closed field only shrinks. Four runs agreed within 25ms.\n\nForty processes landing ten times each with no think time, 400 landings in 16.9s at full utilisation: hold 42ms mean; wait p50 782ms, p90 3,592ms, p99 8,137ms, worst 12,951ms — 7.7 times the packed drain.\n\nForty processes taking the hold for a fixed 250ms ten times each, which is the length a landing takes in this checkout: wall 100s; wait p50 752ms, p90 25,788ms, p99 44,811ms, worst 54,565ms — 5.5 times the 10,000ms packed drain.\n\nWatching `.git/akasha-landing.lock` in this checkout while the swarm ran: 64 holds over 223s, 258ms median, 297ms worst, 7.3 percent utilisation, 10 of the 64 handed straight to a waiter. Arrival runs 14 times below saturation, so the measured tail is what a busy period would cost rather than what today costs.\n\nThe median wait being under a second while the worst is a minute is the shape of barging: `holding.module.code.ts:52` waits 5ms and races again, and a fresh arrival is as likely to win as one that has lost forty rounds.",
} as const satisfies Finding

import type { Finding } from "../finding.page-type.ts"

export const theMonarchCookieStandingTonightIsDead = {
  id: "01a05b44-9d6a-7826-a924-bc44b9c0eaa1",
  pageTypeSlug: "finding",
  slug: "the-monarch-cookie-standing-tonight-is-dead",
  domainSlug: "domain/monarch",
  claim:
    "The MONARCH_COOKIE standing in the home secrets file tonight is expired. Monarch answers 401 to it. So the reading service is complete and installed and running on its timer, and every run of it fails on the credential until Alan signs in at a browser and writes a fresh Cookie header into that file. That one thing is unproven: no reading has been taken from live Monarch.",
  evidence:
    "Running the reading by hand against the environment as it stands answers `Monarch answered 401 for the ring counts` and leaves on code 1. The same credential fails the same way elsewhere and has for at least a day: `monarch-poll.service` is `OnCalendar=minutely` and has been failing every minute with `error: Monarch API 401: Unauthorized` thrown from `monarch/client.ts:252`, and `monarch-sync.service` last failed the same way at 2026-08-31 00:26:29. Both read the same variable through `monarch/credential.ts:4-13`. What is proved without a live session: the refusal when the name is unset is one line naming the variable and leaving on code 2, distinct from the dead-credential refusal on code 1; the unit hands the process the secrets file, shown by the run reaching Monarch and getting a 401 rather than reporting the name unset; the shape of what is written is proved by the four tests in `monarch-reading.module.test.ts`, which stub the fetch and assert the value and the moment land beside the readout. What remains unproven is only that a live Monarch answer becomes a kept reading. The call taken: the service was left enabled rather than disabled, so that it starts working the moment the cookie is refreshed, at the cost of a failed unit every five minutes until then.",
} as const satisfies Finding

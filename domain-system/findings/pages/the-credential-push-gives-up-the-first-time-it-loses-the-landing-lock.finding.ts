import type { Finding } from "../finding.page-type.ts"

export const theCredentialPushGivesUpTheFirstTimeItLosesTheLandingLock = {
  id: "01a05beb-a22d-70f2-aa6b-04938e9830d5",
  pageTypeSlug: "finding",
  slug: "the-credential-push-gives-up-the-first-time-it-loses-the-landing-lock",
  domainSlug: "workspace-package/agents",
  claim:
    "The credential push makes one attempt at the landing and takes any refusal as final, including a lost race for `.git/akasha-landing.lock`, which is not a judgement on the change but a statement that nothing looked at it. The rotated pair then goes to the escape hatch and the account's expiry stamp does not advance. An account has about eight hourly attempts inside one token's life, so this self-heals in the ordinary case and would not under sustained contention.",
  evidence:
    "Watched happen. At 2026-09-01T01:40:38-06:00 the upkeep cycle reported `the credential did not reach its page — audhdalan: nothing was committed and what was written was put back — another landing has held `.git/akasha-landing.lock` for longer than 120s`. Five accounts in that same cycle landed and their stamps advanced; audhdalan alone lost the race and fell back to the escape hatch.\n\n`landInAkasha` retries only the required-reading rounds, up to four, and returns the refusal for anything else. The lock is not a reading round, so one loss ends the attempt. `pushCredentialToPage` treats every refusal alike and calls `heldBeside`.\n\nNothing is lost when this happens: the pair is held beside the page, the next read prefers it where it is fresher, and the stamp already standing stays live. The exposure is only that `access-token-expires-at` stops advancing for that one account until a later cycle wins the lock, and the stall detector rules on that stamp alone, so a run of losses would read as a stall that is not one.\n\nEleven or more lanes were landing concurrently while this was observed, which is not the steady state. A retry inside the push would hold the lock longer and worsen the contention it is reacting to, so backing off and leaving it to the next hourly cycle may well be the right shape. The question is whether one attempt per hour is enough margin, given a token lives about eight hours and the detector cannot tell a lock loss from a dead refresh.",
} as const satisfies Finding

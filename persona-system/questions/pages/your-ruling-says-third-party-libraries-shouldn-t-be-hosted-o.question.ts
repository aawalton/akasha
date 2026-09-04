import type { Question } from "../question.page-type.ts"

export const yourRulingSaysThirdPartyLibrariesShouldnTBeHostedO = {
  id: "019f993b-035f-7a61-9446-7651bf6a1390",
  pageTypeSlug: "question",
  slug: "your-ruling-says-third-party-libraries-shouldn-t-be-hosted-o",
  ask: "Your ruling says third-party libraries shouldn't be hosted or in the system at all. We are hosting six of them right now, and our own add-ons hard-depend on them — so stopping breaks David's install until the rewrite lands. Does M1 wait, or ship on an interim?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "A) Stop hosting now — David installs the 6 libraries himself from ESOUI/Minion, which is standard ESO practice. M1 ships this week; our bundle carries only Temper code.",
    "B) M1 waits for the rewrite. Nothing third-party ever reaches a user from us, at the cost of David waiting on a multi-week programme.",
    "C) Keep hosting for M1 only, ship now, rewrite removes them after. Fastest for David, but it means knowingly redistributing them a while longer.",
  ],
  answer:
    "Lets do the rewrite now, based on the previous 100 of these we've done, I expect it will likely be hours, not weeks to resolve those. TTC can stay in my system and David can install it through Minion if he wants it, we don't distribute any third-party addons.\n\nHowever, if these are already in TypeScript, then we might just need to rename them and remove the licensing, since we'd have already fundamentally transformed them from the vendored ones written in lua.",
  closedAt: "2026-07-25T12:25:33.755Z",
  context: "txt",
} as const satisfies Question

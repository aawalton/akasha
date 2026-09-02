import type { Finding } from "../finding.page-type.ts"

export const theRecreatedPledgeRotationDropsAMalformedEpochGuard = {
  id: "01a0606d-0d41-7919-b019-3b7b4d3027c9",
  pageTypeSlug: "finding",
  slug: "the-recreated-pledge-rotation-drops-a-malformed-epoch-guard",
  domainSlug: "domain/temper",
  claim:
    "akasha/temper/temper-dungeons/pledge-rotation drops a guard its original carried. temper/shared-foundation-misc-dungeons/src/pledge-rotation.ts threw on an epoch date that split into other than three parts. The recreation throws only when one of the first three parts is undefined, so an epoch carrying a fourth dash now computes a rotation day instead of failing.",
  evidence:
    "The originals were diffed module by module before any caller moved. Four of the five modules differ only in the relative imports the akasha module layout asks for. pledge-rotation differs further.\n\nThe original opened its date reader with `if (parts.length !== 3) { throw new Error(...) }` and then repeated the throw for an undefined part. The recreation keeps the second throw and drops the first. Both refuse a date with too few parts, because a missing part reads undefined. Neither refuses a date with too many: `2020-01-01-x` splits into four, the first three are defined, and the recreation returns a day number from them. The original refused it.\n\nThe recreation also renames getEsoDay to esoDayNumber and getEpochDay to epochDayNumber, and folds the epochDay local into its one use. Both are internal to the module and neither is exported, so no caller sees them.\n\nNothing live differs today. The one caller is temper/player-completion-addon/src/undaunted-pledges.ts, which passes TEMPER_QUEST_GIVERS from the generated data, and all three epochs there are well formed. The guard mattered for hand-written data, which is what the quest-giver pages under akasha/temper/temper-catalog/temper-world/quest-givers/pages now are.\n\nThe teardown of temper/shared-foundation-misc-dungeons was blocked by its generator for a separate reason, so the original is still on disk and the guard can be read back off it.",
} as const satisfies Finding

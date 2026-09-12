import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const nothingRecordsWhatALandingWasComposedAgainst = {
  id: "01a0950d-13fb-73b1-9a9c-fb993346f20f",
  type: "finding",
  slug: "nothing-records-what-a-landing-was-composed-against",
  domain: "domain/change",
  claim:
    "The kept edits a landing folds are swept the moment that landing commits, and nothing keeps the agent, the paths, or the commit those rows were composed against, so a landing that silently reverted another can be worked out only by inference.",
  evidence:
    "`371d5b065f4` composed its edits against a stale read of `commands/pages/inference/zimage/inference-zimage.command.ts` and landed seven seconds after `111c06eb0a7`. It wrote the whole page from that stale copy, putting six `arguments` entries back into `taking` and undoing the earlier landing without a word. An agent found it by hand and re-landed it as `e659f26d471`. Nothing in the repository could have found it. The cost line that apply wrote states `ran` as `apply` and names no act, because the rows had been drafted by some earlier call. The rows themselves were swept by `swept` at `changes/modules/edits-keeping/edits-keeping.module.code.ts:210` as the fold landed, and while a row is there it states its edit alone: no agent, no commit it was composed against. Three fields kept at the sweep would have named the fault in one query. A fault that can only be worked out by inference is a fault that will be argued about next time.",
} as const satisfies Finding

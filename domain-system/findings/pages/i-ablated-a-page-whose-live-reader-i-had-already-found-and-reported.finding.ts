import type { Finding } from "../finding.page-type.ts"

export const iAblatedAPageWhoseLiveReaderIHadAlreadyFoundAndReported = {
  id: "01a06861-f664-7b21-9c4d-2f7e5a10c006",
  pageTypeSlug: "finding",
  slug: "i-ablated-a-page-whose-live-reader-i-had-already-found-and-reported",
  domainSlug: "domain/akasha-migration",
  claim:
    "Finding a live reader is not the same as letting it stop you. I grepped for readers of the seat-conditions singleton, found tools/lib/seat-conditions.ts, wrote it into the commit message as needing a repoint, and ablated the page in that same commit. readSeatConditions throws without it and every seat spawn reads it, so another lane had to put the file back eight minutes later. The rule that actually holds is that a live reader outside your block is a blocker on the ablation, not a note to attach to it.",
  evidence:
    "Ablated in ed15c871c446a1efcc4519bc27b19001e44452b8, restored in a4c83ea06a4eeb8e34f1e95f4f99886101ab26bc, 'the seat-conditions singleton comes back: readSeatConditions throws without it and every seat spawn reads it'. tools/lib/seat-conditions.ts was last touched 2026-09-01 and still reads the old store by page type.\n\nThe control case is in the same lane and came out the other way. pages/subagent-kind had the same shape of reader, tools/compose-subagents.ts, hardcoding the folder at line 12. That migration held, because a lane repointed the reader in 4aef10f20f, 'compose-subagents reads the subagent kinds from akasha rather than from the removed markdown folder', three minutes before the seat-conditions page had to be restored. Same evidence class, opposite outcome, and the difference was entirely whether the reader moved.\n\nThe second control is pages/repo, where the same grep found akasha/pages-system/checkout-roots/checkout-roots.module.code.ts:11 building the checkout marker from that folder. There I did not ablate, and that was right. What separated the two decisions was not the strength of the evidence, which was the same, but whether I ran the consumer grep before deciding or after deciding. Run it before, and treat what it returns as a gate.\n\nBoth copies of the seat-conditions singleton stand now. The duplication resolves when tools/lib/seat-conditions.ts is repointed at akasha/seat-system/seat-conditions, not before.",
} as const satisfies Finding

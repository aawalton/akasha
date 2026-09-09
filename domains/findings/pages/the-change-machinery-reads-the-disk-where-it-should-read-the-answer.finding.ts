import type { Finding } from "../finding.page-type.types.ts"

export const theChangeMachineryReadsTheDiskWhereItShouldReadTheAnswer = {
  id: "01a08328-e21e-76ad-a64c-ce3bff5a2f5a",
  pageTypeSlug: "finding",
  slug: "the-change-machinery-reads-the-disk-where-it-should-read-the-answer",
  domain: "workspace-package/change",
  claim:
    "A layer of the change machinery reads the committed tree where what it owes an answer about is the state the change leaves.",
  evidence:
    "Six were found and mended on one day, each in a different layer, each reading as its own bug. `9feebde044`: change-preparing never handed the carries to `changeOf`, so a pure move was absent from `change.changed`. `06c0e0af7b`: a page's rename did not carry the files the index says its type has in a file. `b596d58e80`: guards were handed the world after the change, so every guard reading `given.before` passed vacuously. `e4f5f21bdd`: a test world read the committed index rather than the one the change leaves. `fc4f4e3f29`: the indexer withdrew a page type's old entries by re-deriving them from a page type already renamed away, so it withdrew nothing and left two paths under one id. `f1e9f5880e`: `rereadOver` refiled an importer's edges from the working tree, restoring an edge the change had taken away. Two of the six sat beside a page already stating the rule the code broke.",
} as const satisfies Finding

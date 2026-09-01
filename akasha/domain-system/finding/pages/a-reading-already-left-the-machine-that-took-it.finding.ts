import type { Finding } from "../finding.page-type.ts"

export const aReadingAlreadyLeftTheMachineThatTookIt = {
  id: "01a05b73-d737-7863-8cc2-0f009397d2c5",
  pageTypeSlug: "finding",
  slug: "a-reading-already-left-the-machine-that-took-it",
  domainSlug: "domain/monarch",
  claim:
    "The invariant `A reading never leaves the machine that took it` was already false before anything changed tonight, so narrowing it corrects a wrong statement rather than departing from a true one. A reading has been crossing the public internet between two pods for as long as Jenny's tile has drawn one. What the invariant meant is true of the file rather than of the reading, and what it was reaching for stands beside it already: a reading never reaches the commit.",
  evidence:
    "`readout-reading.module.ts` stated `A reading never leaves the machine that took it` beside `A reading never reaches the commit`. But `smilingjenny/web/app/routes/api.categorization.ts:25` calls `fetchRingCountsFromRoute(\"https://alanwalton.com/api/categorization\")`, and `shared/monarch-categorization-access/ring-relay.ts:11-20` attaches `X-Relay-Secret` from `SMILINGJENNY_RELAY_SECRET` to that call. Alan's pod was the machine taking the reading, at `api.categorization.ts:21-24` over `MONARCH_COOKIE`, and `guardRingReadout` in `alanwalton/web/app/readout-credential/lib/readout-credential.server.ts:28-33` admitted Jenny's pod on that secret. So one pod took a reading and another pod fetched it off it, across the internet, every time Jenny's tile drew. The secret making that possible stands in both sops files: `alanwalton/web/deploy/secrets.sops.yaml:28` and `smilingjenny/web/deploy/secrets.sops.yaml:12`. The statement was aspirational and never held. It now reads `The file a reading is kept in never leaves the machine that took it`, which is true: `readout-reading.module.code.ts:12-14` writes through `mergeUncommitted` into a `.uncommitted.ts` sidecar that `.gitignore:2` keeps out of every commit, and nothing copies that file anywhere. A reading itself is carried, deliberately, by `module/readout-relay`.",
} as const satisfies Finding

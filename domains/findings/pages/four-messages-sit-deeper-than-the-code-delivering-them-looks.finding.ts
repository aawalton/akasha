import type { Finding } from "../finding.page-type.types.ts"

export const fourMessagesSitDeeperThanTheCodeDeliveringThemLooks = {
  id: "01a082e2-8d52-7fc5-a5f7-91e9b7431180",
  pageTypeSlug: "finding",
  slug: "four-messages-sit-deeper-than-the-code-delivering-them-looks",
  domain: "workspace-package/seat-system",
  claim:
    "Four message pages sit a folder deeper than the rest, where the code delivering messages never looks.",
  evidence:
    "`seat-system/messages/pages` holds 171 files matching `*.message.ts` while the index holds 175 rows for the `message` page type. The four extra sit in folders of their own, named `59334bba2311`, `587b5e07eb8e`, `0433a6dace52` and `fbe5a697734c`. `message-file.module.code.ts` lists that folder flat, so it has never seen them and they have never been delivered. Reaching them through the index instead surfaces all four, but the module reaches a message by composing a flat path from that message's id, so each would answer as gone and be redelivered on every poll. That is why `126e879e67` put the folder listing back and left the gap on the module's page.",
} as const satisfies Finding

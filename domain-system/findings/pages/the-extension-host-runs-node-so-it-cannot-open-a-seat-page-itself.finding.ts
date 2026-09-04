import type { Finding } from "../finding.page-type.ts"

export const theExtensionHostRunsNodeSoItCannotOpenASeatPageItself = {
  id: "01a06811-01d3-7006-859a-d62a552760e8",
  pageTypeSlug: "finding",
  slug: "the-extension-host-runs-node-so-it-cannot-open-a-seat-page-itself",
  domainSlug: "workspace-package/editor-extension",
  claim:
    "Opening the values kept beside a seat's page needs a transpiler only bun carries. The extension host runs node, so doing it in the host throws `Bun is not defined`. Everything the extension wants out of the pages is therefore asked of a bun child through the harness rather than read in the host. A change that reads a page directly from extension code typechecks clean and throws at load.",
  evidence:
    "`transcript-sources` asks `seat-transcripts` for where every seat's transcript is, in one call, rather than opening the seat pages itself. The whole list is answered at once and held for a fixed moment because the transcript panel asks on every tick and the agent tree asks once per live seat.\\n\\nThe same shape stands across the extension: the domain, page and work panels each reach their answer through `harness-call` rather than through the pages system.\\n\\nThis was recorded as a comment on the source before the module carried it. It is filed rather than dropped because the cost of forgetting it is a change that compiles and then fails only in Alan's editor.",
} as const satisfies Finding

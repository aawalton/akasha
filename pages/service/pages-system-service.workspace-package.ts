import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pagesSystemService = {
  id: "01a059f5-b807-7dee-b0fc-4f45379fca1c",
  pageTypeSlug: "workspace-package",
  slug: "pages-system-service",
  definition: "the pages reached over HTTP",
  manifest: "json",
  partSlugs: [
    "module/page-asking",
    "module/page-calling",
    "module/page-composing",
    "module/page-listening",
    "module/page-reading",
    "module/page-serving",
    "module/page-writing",
    "module/where-testing",
    "workstation-service/pages-system-service",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The pages system service runs on a workstation.",
    },
    {
      invariantKind: "departure",
      statement: "It answers for the pages standing in akasha and for no others.",
    },
    {
      invariantKind: "departure",
      statement:
        "A query is answered from the index and from the values beside the pages it names.",
    },
    {
      invariantKind: "absence",
      statement: "A read takes no lock.",
    },
    {
      invariantKind: "departure",
      statement: "A read is answered while another read is being answered.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is never older than the file it speaks for.",
    },
    {
      invariantKind: "departure",
      statement: "A write commits the values its pages keep in the commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value a page keeps outside the commit is written beside the page and committed with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A write is not gated by the checks.",
    },
    {
      invariantKind: "departure",
      statement: "A write is not a break of the glass.",
    },
    {
      invariantKind: "departure",
      statement: "Writes arriving while one is committing are committed together.",
    },
    {
      invariantKind: "departure",
      statement: "A write names its writer.",
    },
    {
      invariantKind: "departure",
      statement: "The writer a write names stands in the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A write that did not commit put nothing into the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The index the pages system service reads is built from the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "The index names the paths the pages system service does not answer for.",
    },
    {
      invariantKind: "departure",
      statement: "A pod reaches the pages system service over the tailnet.",
    },
    {
      invariantKind: "departure",
      statement: "The port the pages system service listens on is read from a page.",
    },
    {
      invariantKind: "departure",
      statement: "The host names the pages system service answers on are read from a page.",
    },
    {
      invariantKind: "absence",
      statement: "The pages system service answers on the house network.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no port is refused when the page is written.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the cluster reaches reads as ready only while the pages system service is listening.",
    },
    {
      invariantKind: "gap",
      statement:
        "The pages system service is not what limits any caller of the pages system service.",
    },
    {
      invariantKind: "gap",
      statement: "An answer costs nothing where the pages the answer rests on have not changed.",
    },
  ],
} as const satisfies WorkspacePackage

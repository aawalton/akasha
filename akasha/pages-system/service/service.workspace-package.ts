import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const service = {
  id: "01a059f5-b807-7dee-b0fc-4f45379fca1c",
  pageTypeSlug: "workspace-package",
  slug: "service",
  definition: "the pages reached over HTTP",
  manifest: "json",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "It runs on a workstation.",
    },
    {
      invariantKind: "departure",
      statement: "It answers for the pages standing in akasha and for no others.",
    },
    {
      invariantKind: "departure",
      statement: "A query is answered from the index and the file the index names.",
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
      statement: "A write is committed.",
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
      statement: "A write that did not commit did not write.",
    },
    {
      invariantKind: "departure",
      statement: "The index it reads is built from the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "The index names the paths it does not answer for.",
    },
    {
      invariantKind: "departure",
      statement: "A pod reaches it over the tailnet.",
    },
    {
      invariantKind: "departure",
      statement: "The port it listens on is read from a page.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no port is refused when it is written.",
    },
    {
      invariantKind: "departure",
      statement: "What the cluster reaches reads as ready only while it is listening.",
    },
    {
      invariantKind: "gap",
      statement: "It is not what limits any caller of it.",
    },
  ],
} as const satisfies WorkspacePackage

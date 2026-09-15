import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const gitTransport = {
  id: "01a06816-2f11-7be3-9bd7-706fac3996ff",
  type: "page-type/domain",
  slug: "git-transport",
  definition: "the repositories this system keeps, served over the network",
  parts: [
    "manifest/git-transport-janitor",
    "manifest/git-transport-manifests",
    "module/backend-env",
    "module/bare-repo-init",
    "module/http-backend",
    "module/push-event",
    "module/transport-auth",
    "module/transport-deployment",
    "module/transport-naming",
    "module/transport-repos",
    "module/transport-serving",
    "page-type/git-hook",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repository is served out of the store on the node the workload is pinned to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repository names in its own config the copy that repository mirrors to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook is wired to a repository together with the copy that hook pushes to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repository with a mirror hook declares a destination.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repository declaring a destination has a mirror hook.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A push is authenticated before git is reached at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question asked from inside the cluster is answered without authentication.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The workload runs this code out of the source cache rather than an image layer.",
    },
  ],
} as const satisfies Domain

import type { Domain } from "../../domains/domain.page-type.ts"

export const gitTransport = {
  id: "01a06816-2f11-7be3-9bd7-706fac3996ff",
  pageTypeSlug: "domain",
  slug: "git-transport",
  definition: "the repositories this system keeps, served over the network",
  parts: [
    "manifest/git-transport-janitor",
    "manifest/git-transport-manifests",
    "module/transport-repos",
    "module/transport-auth",
    "module/backend-env",
    "module/http-backend",
    "module/push-event",
    "module/transport-serving",
    "module/transport-naming",
    "module/transport-deployment",
    "module/bare-repo-init",
    "shell-script/pre-receive-change-branches",
    "shell-script/pre-receive-main-append-only",
    "shell-script/post-receive-mirror",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A repository is served out of the store on the node the workload is pinned to.",
    },
    {
      invariantKind: "departure",
      statement: "A repository names in its own config the copy that repository mirrors to.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is wired to a repository together with the copy that hook pushes to.",
    },
    {
      invariantKind: "departure",
      statement: "A repository with a mirror hook declares a destination.",
    },
    {
      invariantKind: "departure",
      statement: "A repository declaring a destination has a mirror hook.",
    },

    {
      invariantKind: "departure",
      statement: "A push is authenticated before git is reached at all.",
    },
    {
      invariantKind: "departure",
      statement: "A question asked from inside the cluster is answered without authentication.",
    },
    {
      invariantKind: "constraint",
      statement: "The workload runs this code out of the source cache rather than an image layer.",
    },
  ],
} as const satisfies Domain

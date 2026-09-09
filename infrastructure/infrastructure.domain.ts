import type { Domain } from "../domains/domain.page-type.ts"

export const infrastructure = {
  id: "01a0658b-0f02-735b-af6a-28559398ee59",
  pageTypeSlug: "domain",
  slug: "infrastructure",
  definition: "what the system runs on",
  parts: [
    "domain/storage",
    "domain/network",
    "domain/secret",
    "domain/telemetry",
    "workspace-package/git-transport",
    "workspace-package/analysis-complexity",
    "page-type/alert",
    "workspace-package/ci-benchmark",
    "domain/cluster",
    "domain/auth",
    "domain/container-image",
    "domain/job",
    "domain/node",
    "domain/resource-utilization",
    "workspace-package/eso-rig",
    "domain/postgres-annual-dump",
    "workspace-package/infrastructure-commands",
    "domain/loki-service",
    "domain/seaweedfs",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A resource is a thing a host gives a program to use.",
    },
    {
      invariantKind: "departure",
      statement: "Compute is the cores and memory a program runs on.",
    },
    {
      invariantKind: "departure",
      statement: "Production is the system running for real use.",
    },
    {
      invariantKind: "departure",
      statement:
        "The machines and daemons a pipeline runs on are infrastructure and the pipeline is not.",
    },
    {
      invariantKind: "departure",
      statement: "A daemon is a loop a service runs on a tick.",
    },
    {
      invariantKind: "departure",
      statement: "A daemon runs one tick at a time.",
    },
    {
      invariantKind: "constraint",
      statement: "The workstation's card has one workload at a time.",
    },
    {
      invariantKind: "departure",
      statement: "Generation and training never run together.",
    },
    {
      invariantKind: "departure",
      statement: "A podman volume more than one thing reaches mounts `:z` rather than `:Z`.",
    },
  ],
} as const satisfies Domain

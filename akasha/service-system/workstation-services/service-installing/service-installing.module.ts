import type { Module } from "@akasha/code-system/module"

export const serviceInstalling = {
  id: "01a05a62-6da2-7e4f-9186-137486a0d1e2",
  pageTypeSlug: "module",
  slug: "service-installing",
  definition: "the units a workstation service stands installed as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit is written to a folder of ours and reached by a link systemd reads.",
    },
    {
      invariantKind: "departure",
      statement: "A unit of ours is a unit whose link points into that folder.",
    },
    {
      invariantKind: "departure",
      statement: "Anything else standing beside a unit of ours is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A unit of ours that no service accounts for is taken away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service that is not to be running is written its unit and stopped rather than taken away.",
    },
    {
      invariantKind: "departure",
      statement: "Only the unit systemd starts the service by is enabled.",
    },
    {
      invariantKind: "departure",
      statement: "systemd is reloaded after the units are written and before any is enabled.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl call that refuses is carried back rather than printed and forgotten.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is installed for the whole machine.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the cluster.",
    },
  ],
} as const satisfies Module

import type { TextProperty } from "@akasha/pages/text-property"

export type TalosSecrets = string

export const talosSecrets = {
  id: "01a081cf-aa06-78f6-a57a-b9ebe5e7c333",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "talos-secrets",
  propertySlug: "talos-secrets",
  definition: "the secret bundle a cluster's machines are provisioned from",
  maxLength: 20000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle sits in the cluster's sops file rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement: "The bundle is written by the command generating it rather than by an author.",
    },
    {
      invariantKind: "departure",
      statement: "The keys inside the bundle are Talos's own rather than this property's.",
    },
  ],
} as const satisfies TextProperty

import type { Module } from "@akasha/code/module"

export const serviceHealth = {
  id: "01a0821e-fce3-79c6-bf54-45289546f49a",
  pageTypeSlug: "module",
  slug: "service-health",
  definition: "whether the unit each workstation service is installed as is running as it should",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service that is not to be running is watched by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The unit whose health is read is the service unit rather than the timer.",
    },
    {
      invariantKind: "departure",
      statement: "A unit that failed is broken whether or not that service is scheduled.",
    },
    {
      invariantKind: "departure",
      statement: "A service publishing a host name it could not bind is broken.",
    },
    {
      invariantKind: "departure",
      statement: "A host name unbound is broken whether or not that service is scheduled.",
    },
    {
      invariantKind: "departure",
      statement: "What a service published beside its page is read from the checkout looked at.",
    },
    {
      invariantKind: "departure",
      statement: "A scheduled service resting between its runs is well.",
    },
    {
      invariantKind: "departure",
      statement: "A service that is to be running and is not is broken.",
    },
    {
      invariantKind: "departure",
      statement: "A service still coming up is well rather than broken.",
    },
    {
      invariantKind: "departure",
      statement: "A unit systemd does not know is broken rather than well.",
    },
    {
      invariantKind: "departure",
      statement: "A service reads as broken with the words systemd used.",
    },
    {
      invariantKind: "departure",
      statement: "systemd is asked about every unit at once rather than about one at a time.",
    },
    {
      invariantKind: "departure",
      statement: "The page a service is stated on is carried with that service's health.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a unit or sends a message.",
    },
  ],
} as const satisfies Module

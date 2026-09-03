import type { Module } from "@akasha/code-system/module"

export const exerciseLoadModel = {
  id: "01a06865-c36f-7e11-9c5b-094fd5903a10",
  pageTypeSlug: "module",
  slug: "exercise-load-model",
  definition: "the implements a movement takes and the share of bodyweight it lifts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A movement loaded with anything but a dumbbell or a kettlebell takes one implement.",
    },
    {
      invariantKind: "departure",
      statement: "A dumbbell movement the name does not mark as one-sided takes two implements.",
    },
    {
      invariantKind: "departure",
      statement:
        "A movement named outright takes the implement count named rather than the worked one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A movement lifting no bodyweight states a load factor of nothing rather than none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A leg or hip movement lifts bodyweight only where its name says squat, lunge or hinge.",
    },
  ],
} as const satisfies Module

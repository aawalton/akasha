import type { PythonModule } from "@akasha/code-system/python-module"

export const esoRigProbe = {
  id: "01a06866-58f8-770f-b723-c2388b0115da",
  pageTypeSlug: "python-module",
  slug: "eso-rig-probe",
  definition: "the measurements the rig's acceptance cannot make in shell",
  python: "py",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The virtual keyboard exists only while this module's process lives.",
    },
    {
      invariantKind: "constraint",
      statement: "The X server starts after the event node appears.",
    },
    {
      invariantKind: "departure",
      statement: "Creating the device and injecting on the device are separate commands.",
    },
    {
      invariantKind: "departure",
      statement: "The event node is found by walking devtmpfs rather than by asking evdev.",
    },
    {
      invariantKind: "constraint",
      statement: "A capture that is uniformly one color is a blank frame reporting success.",
    },
    {
      invariantKind: "departure",
      statement: "The frame comparison is a count of differing pixels rather than a boolean.",
    },
    {
      invariantKind: "departure",
      statement: "Each subcommand prints one line of key and value pairs on standard output.",
    },
  ],
} as const satisfies PythonModule

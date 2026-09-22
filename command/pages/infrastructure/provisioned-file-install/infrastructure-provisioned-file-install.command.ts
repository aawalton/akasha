import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureProvisionedFileInstall = {
  id: "01a0c970-2ed2-7e9e-ac4f-ae7fc7197eb7",
  type: "page-type/command",
  slug: "infrastructure-provisioned-file-install",
  definition: "the command placing every provisioned file the landing has no rights to place",
  code: "ts",
  test: "ts",
  name: "provisioned-file-install",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body a page states under the home is left to the landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a body goes and how it gets there are read from the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A machine the page is not for has that page's body placed nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link already naming the body in the checkout is left as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy is weighed against the body in the checkout byte for byte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body already where its page says is said and placed no second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a page states is run after placing runs only where that body was placed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reload two pages state alike is run once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Root is asked for only where the folder the body goes in is not ours to write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each placing and each reload is said before that placing or reload is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--plan` reports the same placings the run would carry out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that will not read stops the call before anything is placed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path holding a file of its own where a link is stated is left as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The running and the saying this does are handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here places a body the landing already places.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here spells a path, a machine or a reload of its own.",
    },
  ],
  arguments: [{ argument: "argument/plan" }],
} as const satisfies Command

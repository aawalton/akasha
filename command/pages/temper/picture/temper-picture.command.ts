import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperPicture = {
  id: "01a0ca66-a24e-707c-9316-688e7ba7452b",
  type: "page-type/command",
  slug: "temper-picture",
  definition: "the command writing a PNG of one of Temper's windows with the game not running",
  code: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is named by the slug the harness lists it under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window nothing here brings up is refused by naming the windows that are here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window an interface document declares outright is refused by saying why it is not here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window whose control the addon never made is refused rather than written empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole screen is pictured rather than the window the call names alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window a call names says which addon comes up and what opens that window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says where on the screen the window a call names sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the commit the addon was built at, so nothing reads as current.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder the file sits in is made where that folder is not there already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The harness is closed whether the picture was written or thrown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges what the picture shows.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here builds an addon, so a picture is of the last build rather than the checkout.",
    },
  ],
  name: "picture",
  arguments: [
    { argument: "argument/picture-subject", required: true, saidAs: "word" },
    { argument: "argument/out", required: true },
  ],
} as const satisfies Command

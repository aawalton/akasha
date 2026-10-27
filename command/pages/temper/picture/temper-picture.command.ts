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
      statement: "The picture is as wide and tall as the screen the harness was staged with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What opening the window called for later has run before the picture is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window a call names says which addon comes up and what opens that window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every addon that window names alongside its own comes up with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says where on the screen the window a call names sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says whether that window is shown, what hides it, and the scene up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the commit the addon was built at, so nothing reads as current.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says how many of the game's own files the sandbox refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names every add-on file taken from the game's addons folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names every add-on file built from the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture is played as the character a call names, or else as the last one played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character the account has no page for is refused by naming the characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says which character the picture was played as.",
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
      decisionKind: "decision-kind/departure",
      statement: "A texture is drawn with the game's own art where the workstation has the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names every texture drawn that neither the game nor an add-on has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names every Lua error the sandbox ran past while opening the window.",
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
    { argument: "argument/character" },
  ],
  createdAt: "2026-09-22T18:35:18.990Z",
  updatedAt: "2026-10-27T19:37:27.413Z",
} as const satisfies Command

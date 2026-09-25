import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockAkashaReads = {
  id: "01a04eb3-0e18-748c-9e7f-ae84d9254e02",
  type: "page-type/agent-hook",
  slug: "block-akasha-reads",
  definition:
    "a refusal of a call showing a body inside this checkout, naming the akasha call instead",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Read", "Grep", "Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the akasha call that records what the call refused would show.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A whole file is named to `akasha read`, and lines matching a pattern to `akasha search`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every route a refusal names is itself let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Grep showing lines inside this checkout, or over a folder holding it, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Grep showing only paths or counts is let through, as `rg -l` is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A Glob shows paths and no body, so no Glob is judged here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shell line is judged by checkout-shell-reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Git showing a checkout file at HEAD, in the index or on disk is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Git showing a commit's patch, or a file at an earlier revision, is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is judged by where that path lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path opening with `~` lands under the home folder, as Read takes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal says the output must reach the agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read thrown away records nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The index is no page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A Read of the index is let through.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An image's bytes are no page's body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Read of an image's bytes is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image's bytes are told by the file property the image page type declares.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A search is no read.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The body of an akasha file an agent has seen is the body its record shows.",
    },
  ],
} as const satisfies AgentHook

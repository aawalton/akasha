import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const sophiaAgentStopHook = {
  id: "01a091af-b1f9-7864-84c4-4f36df8762d6",
  type: "initiative",
  slug: "sophia-agent-stop-hook",
  domain: "domain/hook",
  persona: "sophia",
  intents: [
    {
      statement: "No clean turn Alan has labelled draws a refusal from the live judge.",
      workingMemory:
        "Met for all four judges the hook now runs: none refuses any of the 227 turns the pool labels as breaking nothing, each measured over two runs. The six turns that read as misfires for Neither Clock Nor Meter all sit outside that 227, labelled against some other rule, and at least three break Neither Clock Nor Meter as well, so the loss there is the answer key rather than the judge.\n",
    },
    {
      statement:
        "Each of the five directives Alan's page states has a judge that misfires on nothing.",
      workingMemory:
        "Three of five have judges, four prompts, each measured over two runs and misfiring on none of the 227 clean turns. `directive-kept` catches 15 of 34 for Neither Clock Nor Meter. `one-at-a-time-kept`, 19 of 33. No Commentary is judged twice by different signs: `no-commentary-kept` on a piece marked worth knowing, `subagent-brief-kept` on what the turn told a helper, and their union catches 18 of 63. The other two directives are blocked rather than unworked.\n",
    },
    {
      statement:
        "A stop that never reached the model is told apart from a turn the model judged clean.",
      workingMemory:
        "116 Stop runs since the hook went live at 15:39 on 2026-09-11, and none refused, while the same judge run offline catches 14 of 34 breaches mined from that same day's logs. Nothing says which of the two numbers to believe, because nothing records whether a run reached the model. `judging` opens the gate on six paths that look alike from outside: no person, no directive, no tail, a subagent still working, a model unreachable, and a bare catch over the whole of it.",
    },
    {
      statement: "The code deciding whether to hold a turn open is tested.",
      workingMemory:
        "`holding` in the hook's code decides refusal from the judges' answers, and is now tested: a model reached by no call, a turn no judge answers yes on, the first yes ending it, and that rule's own words going back rather than the model's. What is still untested is the rest of `judging` — reading the seat's person and that person's directives out of the index — which takes a root to read. The hook's page carries a gap nothing answers: a turn held open twice running says so to the person.\n",
    },
    {
      statement: "A case names every directive the turn breaks rather than one of them.",
      workingMemory:
        "`case-against` holds one rule, so `keeping` reads a turn labelled against another rule as a turn breaking nothing. 165 of the 413 cases are labelled that way. It bites hardest on Don't Stop!, where `Applying module again.` is labelled clean and `Let me make the change.` a breach, and nothing on either says whether the other rule was weighed at all. Until a case names every rule its turn breaks, no judge for that directive can be measured. The rival test says as much on its own page.",
    },
    {
      statement: "Every turn Eppie mined and labelled is a case.",
      workingMemory:
        "292 of her 449 trusted rows landed at `c628cb77f3d`, joining the 121 already there. The other 112 cannot land as things are: `check-reaches-a-path-through-the-index` judges the file the lines land in rather than the change carrying them, so `append-lines-from` gets the draft through and the apply still draws about 130 refusals. The check lets off a file held uncommitted, one a machine writes, and one a tool resolves the paths in, and a case file is none of the three. This waits on Alan's word.",
    },
    {
      statement: "A judge for Act By Default sees the directives reserving an act for Alan.",
      workingMemory:
        "Act By Default says to ask where a directive calls for Alan's approval, and a judge is given that one rule alone. So `May I raise the ceiling?` and `Say the word and I'll land it` read alike to it. The first prompt tried catches 17 of 36 and misfires 18 times over 227, and every misfire is an approval some other page reserves. The test's own page says one rule is put at a time, and this is the rule that breaks on it.",
    },
  ],
  constraints: ["A refusal reminds an agent of a directive Alan's own page states."],
} as const satisfies Initiative

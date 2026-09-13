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
        "Measured against the 413 cases rather than the pool they were mined from, which shares none of their ids and lacks 51 of the 214 clean turns. `no-commentary-kept` and `subagent-brief-kept` refuse none of the 214, over two runs each. `directive-kept` refuses one, the same one on three runs, reading a command's timeout as a limit of the agent's own. `one-at-a-time-kept` refuses one and then two. A fifth judge was taken off the hook for refusing two.\n",
    },
    {
      statement:
        "Each of the five directives Alan's page states has a judge that misfires on nothing.",
      workingMemory:
        "Three of five have judges. Over the 413 cases, `directive-kept` catches 15 of 34 for Neither Clock Nor Meter and `one-at-a-time-kept` 13 of 24, and each refuses a clean turn. No Commentary is judged by two signs whose union catches 14 of 64 and refuses nothing clean. A third sign for it, a wait restated, is landed and off the hook: the key labels three turns carrying its mark clean and nine like them breaches.\n",
    },
    {
      statement:
        "A stop that never reached the model is told apart from a turn the model judged clean.",
      workingMemory:
        "461 Stop runs since the hook went live, of which 36 ran long enough to have reached a model and one refused. Nothing said which gate the other 425 opened, so each run now appends a line beside the hook page naming where it stopped: no payload, a stop refused already, no seat, a subagent or a shell still to report, no words, no person, no rule, no model, a throw, judged clean, or held open. The first lines recorded name the subagent-or-shell gate.\n",
    },
    {
      statement: "The code deciding whether to hold a turn open is tested.",
      workingMemory:
        "`holding` in the hook's code decides refusal from the judges' answers, and is now tested: a model reached by no call, a turn no judge answers yes on, the first yes ending it, and that rule's own words going back rather than the model's. What is still untested is the rest of `judging` — reading the seat's person and that person's directives out of the index — which takes a root to read. The hook's page carries a gap nothing answers: a turn held open twice running says so to the person.\n",
    },
    {
      statement: "A case names every directive the turn breaks rather than one of them.",
      workingMemory:
        "`case-against` holds one rule, so `keeping` reads a turn labelled against another rule as a turn breaking nothing. 165 of 413 cases are labelled that way, and one sentence lands on both sides of the key: `Next turn is step 3: cost.` breaches in one row and is clean in the next, as do `Say go and I'll land it` and `Two things worth flagging`. That contradiction is the ceiling on every judge's recall here, and it blocks Don't Stop! outright.\n",
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

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
        "`no-commentary-kept` and `subagent-brief-kept` refuse none of the 214 over two runs each, and four more runs over the clean cases alone are measuring, which would bound them under one in 430. `directive-kept` and `one-at-a-time-kept` each refuse one or two, and no wording mends it: three clock wordings refused three different clean turns. Zero over two runs only bounds the rate under one in 140. One turn the key calls clean sizes unfinished work twice, so a correct judge is forced to look wrong.",
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
        "The record is live: 54 runs in 36 minutes. 28 stopped at a subagent still to report, 13 at no model a call could reach, 6 judged clean, 1 held open — the hook's first refusal in the wild — and 1 at a stop refused already. So 34 of the 54 never got near a model, and of the 20 that did, 13 reached none while a bulk measurement ran on the same gateway. Whether that rate holds with the gateway quiet is unmeasured, and until it is, the hook is letting turns through it means to judge.",
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

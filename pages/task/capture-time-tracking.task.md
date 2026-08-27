---
id: 8cf33d88-2688-582f-91a1-7497e1981b24
page-type-slug: task
title: "Capture time tracking"
slug: capture-time-tracking
domain-parent-slug: domain/alan-harness-agents
required-reading-slugs:
  - page-type/task
---

# Definition

- **Capture time tracking** — capturing Alan's day as named sessions from what he says.

# Loop

1. **The command his words name.**
   - **Read** each line of his message as one session. A line carries a title, a clock time, and the codes `s<n>` for his safety and `d<n>` for the difficulty — the time and the codes in either order, and either of them may be missing. `7:45 Jen s4d3`, `Jen 11:45 s4d3.5` and `Projects s2d2 8:15` are all the same shape. The codes are short enough that the line reads as a remark rather than a record, and the message then gets answered as a question instead of written down.
   - **Take** the time on a line as when that session began, and where the line carries none, as the instant his message arrived rather than the instant you reach it; `--at` is what sets it. Everything between the two — reading, checking, a call that refused — otherwise lands inside the session, and the day afterwards reports a state he was never in for time he never spent there.
   - **Switch** rather than start wherever a session is already open: `tracking switch` writes the open session's end time and opens the next at that same instant, where closing and then starting leaves a gap in the day that nothing afterwards reports. Where the activity is unchanged and only his safety level changed, split with `tracking safety <level>` instead — it copies the title, difficulty and relationships onto the new session, where typing `switch` again carries no relationship forward at all.
   - **Split** a session naming the Pod one hour after he got into it and carry the rest on without the word: the pod runs an hour on a timer and stops, so a longer session credits its recovery rate for time he spent out of it. The hour runs from the first session naming the pod, across a change of activity, rather than restarting with each.
   - **Reconstruct** a stretch he describes after the fact as one `tracking log --start --end` per session, and amend a session already written with `tracking edit <id>` or `tracking delete <id>` — never a second `log`, which leaves a duplicate session that the day's points count again. `tracking status --json` is where the id comes from.

2. **What the session cost him.**
   - **Pass** `--safety` only where his safety level changed. It carries forward from the last closed session before this one on `start`, `switch` and `log` alike, so restating it unchanged claims an observation you never made.
   - **Map** his words to the nearest named point on each scale and say which you chose, so that what he corrects is the mapping rather than the number. Safety is the state he was in, −2…5 in half-steps: −2 shutdown · −1 activated · 0 tolerating · 1 resting · 2 productive · 3 happy · 4 secure · 5 outgoing. Difficulty is how much the activity asked of him, 0…5: 1 entertainment · 2 programming · 3 social · 4 conflict · 5 criticism.
   - **Omit** any rating his words did not indicate, a guessed one being indistinguishable from an observed one to every formula reading it. Safety may stand unrated; difficulty may not — `--difficulty` defaults from the `session-activity` catalog and never carries from the prior session, so leave it unset unless he contradicts that default, and where no activity matches the title, `start`, `switch` and `log` refuse the session rather than write it unrated. Add the activity with `tracking activity-set`.

3. **Who was with him.**
   - **Link** a session he spent with someone using `--relationship "<name>"` wherever the title carries no registered alias. Only an alias links a session unasked, matched anywhere in the title rather than as a whole word; a full name never links on its own, so a person carrying no alias is linked by hand every time. An alias two relationships answer to links nobody, and then the day quietly scores Love too low with nothing reporting the miss.

4. **The day he experienced the session in.**
   - **Leave** the day to the code that decides it rather than to your own judgment: a session whose title carries one of the day-turning words on Ione's persona page joins the 6pm-Denver bucket its *finish* lands in, and every other session takes the day of the session immediately before it. A session can add to the day's sleep minutes without turning the day, the two word lists being separate. Placing by hand what it already decides overrides a rule rather than supplying one.
   - **Ask**, showing `tracking status`, before moving a session to another day with `tracking edit <id> --day`. Three cases fall outside what the code decides — an evening nap finishing between 6pm and midnight, fragmented sleep straddling 6pm, and a night he never slept — and a hand-placed day is for those and nothing else.

5. **The hourly question he answered in his own words.**
   - **Apply** what `tracking hourly-confirm-pending` prints as you would anything else he tells you about his time. A custom answer is where he names a boundary in the past, so five words can be a switch, an end time set in the past and a title correction at once.
   - **Stamp** it with `tracking hourly-confirm-reconcile --question <id>`. Nothing works out on its own that an answer was applied, and the next hourly question does not fire at all while an earlier one stands unstamped — so skipping the stamp stops the questions rather than leaving a record open.
   - **Never** prompt him a second time. The questions going quiet when he stops answering is a protection built into how the command works, not a gap to close.

# Invariants

- **Never write a session or a day row directly.** A `page update` reaches both and skips the re-linking `edit` does, leaving the session joined to the day row it already pointed at with nothing later comparing the two; every sanctioned write goes through `ops tracking`.

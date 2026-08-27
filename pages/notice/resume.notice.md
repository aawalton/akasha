---
id: 5f2e590a-7e81-516e-9734-9cb319812010
slug: resume
page-type-slug: notice
title: "Resume"
---

# Resume Notices

What a seat is told when something puts it back to work. Each `##` below is a notice its caller asks for by name, and the paragraphs under it are the words the seat receives. They arrive as a real user turn, which the seat reads and acts on. Changing one costs an edit here, and the change reaches a seat the next time it is resumed.

Every notice the supervisor hands to a respawn opens with `[supervisor]`, which is how the fleet's hooks tell a machine-composed prompt from Alan at the keyboard. A notice that loses it is read as his typing. The last three below arrive on a message row instead, which records its own sender, so they carry no such opening: a marker in the text would be a second copy of a distinction already held.

`limit-resume-nudge` goes to a seat that is ALIVE and idle rather than respawned — its previous turn ended at a Claude usage limit that has since cleared. Its text is also the monitor's anti-hammer key: before sending, the monitor asks whether a message with these exact words landed recently. Editing it retires the old key, so a seat nudged under the previous wording inside that window may be nudged once more under the new one. That is bounded by one window and costs one turn.

`overload-resume-nudge` goes to a seat that is ALIVE and idle whose previous turn was ended by an overloaded model service rather than by the seat itself. Its text is the anti-hammer key in the same way, and the window it is asked against grows with each overload in a row, so editing it retires a key that a growing window was measured against.

`editor-revive` goes to a seat Alan brings back from the Agents panel in his editor. He is at the keyboard when it is composed, so a failure to compose it refuses the revive and tells him, rather than reviving a seat with nothing to say to it.

`restart-recovery-clause` is appended once to every restart notice, after the branch that picks between the other two restart notices and an operator's own words, so a seat a human was intervening in is told whatever it says like every other seat. It stands empty: a message claimed and never consumed is released and redelivered on resume, which is what it was a workaround for.

`restart-deferred` rides the seat's next real inbound rather than a restart, so hours may have passed by the time it is read. It is not allowed to tell the seat to pick up what it had in hand, because it goes to a seat that was idle.

## restart-immediate

[supervisor] You have been restarted.

## restart-deferred

[supervisor] You were restarted for routine maintenance while idle. (This notice was held until now — real work just arrived below.)

## restart-recovery-clause

## limit-resume-nudge

▶️ Your previous turn ended at a Claude usage limit that has since cleared. Resume the work you were doing, continuing from exactly where the limit interrupted it.

## overload-resume-nudge

▶️ Your previous turn was ended by an overloaded model service rather than by you, so nothing you were doing was finished or refused. Resume the work you were doing, continuing from exactly where it was interrupted.

## editor-revive

You were stopped from the Agents panel in Alan's editor, and you have just been brought back on the session you stopped with.

Take up the assignments you were holding when you stopped — all of them, as they stood. `ops seat set --show` prints what is stated on you; the conversation above carries anything that was never stated on a seat, an errand among them.

If you were holding nothing, say so and end your turn. A seat that was idle comes back idle, and that is correct rather than a fault to fix.

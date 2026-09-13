import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const readRecord = {
  id: "01a04e96-c80a-79ef-819f-a455a96a0e54",
  type: "module",
  slug: "read-record",
  definition: "what an agent has read, kept beside that agent's page and answered in one file read",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading is found by agent and then by path.",
    },
    {
      invariantKind: "departure",
      statement: "Which agents read a path is asked of every agent, there being few of them.",
    },
    {
      invariantKind: "departure",
      statement: "Which agents there are is read from the index rather than from a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the path read.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the object id of the body read.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries when the path was read.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the object id a carry left.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "A line written before the carried oid was named has that oid under `mechanicalOid`.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries how far into the body the agent has read.",
    },
    {
      invariantKind: "departure",
      statement: "A line carrying no reach into the body means the whole body reached the agent.",
    },
    {
      invariantKind: "departure",
      statement: "A reading carrying a reach into the body answers no body.",
    },
    {
      invariantKind: "departure",
      statement: "An object id is git's own over the bytes that were read.",
    },
    {
      invariantKind: "departure",
      statement: "An agent's readings sit in one file beside that agent's own page.",
    },
    {
      invariantKind: "departure",
      statement: "That file is claimed for its page in the index as the file opens.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index claims nothing for claims this file by nothing either.",
    },
    {
      invariantKind: "departure",
      statement: "An agent no page names holds no reading, and a read of one records nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The record is written again from no page.",
    },
    {
      invariantKind: "departure",
      statement: "One agent's readings are one agent's own file.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is appended, and the last line naming a path is that path's reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body answers a reading where the body is the body read or the body a carry left.",
    },
    {
      invariantKind: "departure",
      statement: "Reading a body again clears the object id a carry left.",
    },
    {
      invariantKind: "departure",
      statement:
        "A carry moves a reading of the changed file onto the body and path the change left.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is carried only where its body is the body the carry started from.",
    },
    {
      invariantKind: "departure",
      statement: "A carry moves how far into the body the agent had read.",
    },
    {
      invariantKind: "departure",
      statement: "The body a carry left answers the question a warrant asks.",
    },
    {
      invariantKind: "departure",
      statement: "The body a carry left does not answer writing over that body itself.",
    },
    {
      invariantKind: "departure",
      statement: "The record's owner is the seat or the subagent acting under that seat.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's readings are its own.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent begins with no reading its seat holds.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's readings outlive its page going and coming back.",
    },
    {
      invariantKind: "departure",
      statement:
        "The readings a subagent made move onto its seat as its page goes, as its edits do.",
    },
    {
      invariantKind: "departure",
      statement: "A seat keeps those readings beside itself rather than among its own.",
    },
    {
      invariantKind: "departure",
      statement: "A reading a seat keeps that way says which subagent made it.",
    },
    {
      invariantKind: "departure",
      statement: "A reading left beside a page going that moved nowhere goes with that page.",
    },
    {
      invariantKind: "absence",
      statement: "A reading a seat keeps that way answers nothing the seat itself is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent whose page comes back takes back the readings the seat kept for it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading goes back only to a page taken up under the agent id that reading was made by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page composed fresh takes back no reading, whatever path that page is written at.",
    },
    {
      invariantKind: "departure",
      statement: "A reading going back loses the agent id the seat kept it under.",
    },
    {
      invariantKind: "departure",
      statement: "A reading the seat keeps for another agent is left where it is.",
    },
    {
      invariantKind: "departure",
      statement: "An acting name the seat's id does not begin is not honoured.",
    },
    {
      invariantKind: "departure",
      statement: "The seat owns the record when an acting name does not begin with its id.",
    },
    {
      invariantKind: "departure",
      statement: "A removal forgets the reading of the path that went for every agent.",
    },
    {
      invariantKind: "departure",
      statement: "Forgetting a reading writes the file again without the lines that go.",
    },
    {
      invariantKind: "departure",
      statement: "A reading last seen before a moment handed in is swept, whoever holds it.",
    },
    {
      invariantKind: "departure",
      statement: "A reading whose line will not read goes with the next write of that file.",
    },
    {
      invariantKind: "departure",
      statement: "A writer of one of these files takes a lock keyed on that file.",
    },
    {
      invariantKind: "departure",
      statement: "A read whose output would not reach the agent is refused and leaves no reading.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a read's output reached the agent is judged elsewhere and read here.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing is in the record that did not reach the agent.",
    },
  ],
} as const satisfies Module

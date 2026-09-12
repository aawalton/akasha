import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const unitLanding = {
  id: "01a09266-2700-7188-8dc0-348deb34b2d4",
  type: "module",
  slug: "unit-landing",
  definition:
    "the workstation units kept as their pages state them, started again only where behaviour changed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every unit akasha has installed is weighed against the text its page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A unit whose text is already what its page states is left alone and said nothing about.",
    },
    {
      invariantKind: "departure",
      statement: "A unit whose text drifted is written as the page states it.",
    },
    {
      invariantKind: "departure",
      statement: "systemd is told to read the units again where any unit was written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service is started again only where what the running process runs, or runs under, changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a process runs, or runs under, is its `ExecStart`, `Environment` and `WorkingDirectory`.",
    },
    {
      invariantKind: "departure",
      statement: "A timer is armed again only where what arms that timer changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "What arms a timer is its `OnCalendar`, `RandomizedDelaySec`, `AccuracySec` and `Persistent`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A timer that changed is armed again rather than the service it starts being bounced.",
    },
    {
      invariantKind: "departure",
      statement:
        "Everything else a unit states is left to the reload and taken up at the next stop.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service is started again as well where a file that service reaches changed in the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A service whose reach the commit left alone is started again by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service started again because no unit field drifted is told about with no unit written.",
    },
    {
      invariantKind: "departure",
      statement:
        "What started a service again is said as the field that changed or as the file that changed.",
    },
    {
      invariantKind: "departure",
      statement: "A service both a field and a file started again is said to have both reasons.",
    },
    {
      invariantKind: "departure",
      statement: "A service whose page says it is not enabled is started again by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service that is not running is started again by nothing, since it is not running.",
    },
    {
      invariantKind: "departure",
      statement:
        "What starts a service that is stopped is the deploy naming the kind, not a landing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A scheduled service's own unit starts nothing again, because its next tick reads it as it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A unit whose installed text could not be read is written and started again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A landing moves the kind's tree to the commit that landing made.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tree is moved before any service is started again, so what comes up runs the new code.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that committed nothing moves no tree and starts nothing again.",
    },
    {
      invariantKind: "departure",
      statement: "A tree git will not move is said as wrong and the units are still kept.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service running out of a tree that would not move is started again by nothing at all.",
    },
    {
      invariantKind: "departure",
      statement: "A unit is still written, and read again, where that tree would not move.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tree a unit's run is spelled under is the tree the installed units already name.",
    },
    {
      invariantKind: "departure",
      statement: "A landing moves no service onto another tree.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that refuses is said as wrong rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A reload that refuses leaves the units written and starts nothing again.",
    },
    {
      invariantKind: "departure",
      statement: "A reach that will not answer is said as wrong and starts nothing again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here installs a unit, enables one, or takes one away.",
    },
    {
      invariantKind: "absence",
      statement: "A unit no link of akasha's reaches is weighed by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page that is not a workstation service's.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out for itself which files a service reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws out of the landing.",
    },
    {
      invariantKind: "gap",
      statement: "A unit's fields are read flat rather than under the section each sits in.",
    },
    {
      invariantKind: "gap",
      statement: "A service a refused systemctl left as it was is put right by `akasha deploy`.",
    },
  ],
} as const satisfies Module

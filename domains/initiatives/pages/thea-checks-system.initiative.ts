import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  slug: "thea-checks-system",
  domainSlug: "workspace-package/checks",
  personaSlug: "thea",
  intents: [
    {
      statement: "The new system carries every check of the old system that still applies.",
      workingMemory:
        "Ninety old scanners: 11 already carried, 12 hold no rule, 49 judge what has no subject under `akasha/` and wait on the migration, 18 had a subject and are all settled. Carried: no-non-null-assertion, no-angle-bracket-cast, manifest-names-what-is-reached, shell-clean, the property-id taboo term. The other 13 were left, most having nothing here to judge. Twenty-one of the ninety cannot run at all, the graph layer they read being deleted. Resume at the 49 once the migration reaches them.",
    },
    { statement: "The old system carries no check of its own." },
    { statement: "No finding is filed on checks-system or any part beneath it." },
    { statement: "No gap invariant is written on checks-system or any part beneath it." },
    {
      statement: "Every page property is in a properties folder for the page type defining it.",
      workingMemory:
        "Found while making the parts a spanning tree: the folder holding a property's file and the page type introducing that property disagree in real cases. `category-slug` sits under `monarch-months` while `category-rule` introduces the property; `effect-type` and `metric-id` sit under `temper-catalog-things` while `temper-companion-trait` introduces both. `introduced-property-is-a-part` judges the declaration and says outright that the folder is not judged. No check judges the folder.",
    },
    {
      statement: "Every check is cheap enough for audit.",
      workingMemory:
        "Split off the patch sequence, which ends at turning a check on at patch. The cost over the whole repository is judged here. runsOnAudit is false on every check by Alan's call, an audit being asked for one check at a time. file-has-its-page over the whole tree read 120804 paths, 4.15s wall and 1.74GB peak added, but that count is the change's size rather than the check's own. file-length reads it in 1.9s but peaks 2.8GB. It cannot reach audit until no tracked file is unclaimed.",
    },
    {
      statement: "Every check is green.",
      workingMemory:
        "Was the last of the steps taken over each check, split off because a check goes on at patch before the tree reaches zero and so is on while still refusing. Nothing measures greenness per check yet. file-has-its-page is the worked case: 629 files claimed by no page, none refused today because patch judges only what a change carries. instant-property-slug-closes-with-at is on and green. Touching a file no page claims is refused, so a rename cannot reach one: atlas-web has 21 routes and no pages.",
    },
    {
      statement: "Every route file is claimed by a page.",
      workingMemory:
        "186 files under routes/ across seven web apps and code-system, against 12 route pages. Split off the wider claiming because it waits on Alan rather than on reading: one route page type is shared, a slug is unique per page type, and so `home` cannot be written seven times. Alan is settling that separately, under uniquePropertySlug, which names the property a value is unique within. Resume once a route slug is unique within its app rather than across every app.",
    },
    {
      statement: "Every runtime helper the Lua compiler carries is a page.",
      workingMemory:
        "Stage 2 landed, and no-class now exempts lua-compiler/lualib and lualibs by Alan's call, unblocking the seven files carrying classes. Alan rules that many exports split one per export, shared state extracted into modules exporting their bindings. Five files hold 17 exports. Every split is a migration to lualibs pages, file-has-its-page refusing any edit to an unclaimed src file. Prove each with the suite at /var/tmp/imip/thea-behaviour.lua, because comparing bodies passes a broken bundle.",
    },
    {
      statement: "Every cluster-check module body is claimed by a page.",
      workingMemory:
        "116 of 155 folders under checks/cluster-checks/modules hold code with no page beside it. The 39 that have one are named among the cluster-check page type's parts, and a new page lands only together with its part slug. Every one of these checks is dead pending Alan's ablation, so the page is plain: slug, definition, code, and test where a test is beside it. No invariants, and no judgement about whether the code should live.",
    },
    {
      statement: "Every property file has the page whose property that file is.",
      workingMemory:
        "Ten of eleven settled. The eight ESO days from 2026-08-31 to 09-07 have pages again and their samples are claimed, Alan taking the writer itself separately. The two eso-daily-tracking strays are gone, every measurement in them already on its ESO day once floats and timestamps are normalised. Left is change-running.change-runner.addressed.ts, which no hand can remove: an apply drops any edit naming a change-runner addressed file, reading only the name. Filed as a finding.",
    },
    {
      statement: "Every file beside a page the page holds is claimed by that page.",
      workingMemory:
        "One left of three. The two location-collection descriptions are renamed and claimed. Their qualifier is load-bearing rather than clumsy: page carries a description key that location-collection inherits, so the file name was wrong and the property was right. Left is main.cluster.sops.yaml, a sops sidecar of 14KB that claimsOf never claims, no page type from cluster through host to domain declaring a secret. Whether cluster declares one is Alan's call.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative

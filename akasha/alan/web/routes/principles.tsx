import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { PageTabsTrigger, Tabs, TabsContent, TabsList } from "@akasha/design-patterns/tabs"
import { Heading } from "@akasha/design-primitives/heading"
import { List } from "lucide-react"

export function meta() {
  return [{ title: "Principles" }]
}

const principles = [
  {
    number: 1,
    name: "Judgment",
    tagline:
      "Always use good judgment. If something seems wrong, dig deeper. First research, then ask, never guess.",
    body: "Rules are guidelines, not constraints — apply them in service of their intent. Decisions fall into three tiers: mechanical decisions (deterministic inputs, fixed outputs) get automated; editorial decisions (approach selection, framing, model selection) get agent judgment; high-stakes or user-intent decisions (scope, priority, design direction) get escalated to the user. When facing an unknown, research first — can it be answered by reading code, checking infrastructure, or tracing data flows? If not, ask the user. Genuine ambiguity requires user input; never assume. The distinction between researchable and genuine ambiguity is itself a judgment call.",
  },
  {
    number: 2,
    name: "Quality",
    tagline:
      "Pull on every loose thread. Make the parts people can't see beautiful. Beauty requires clarity and clarity brings success.",
    body: "Internal elegance is a standard, not an absence of mess. Clean logic, precise naming, and deliberate structure are the goal — the code should communicate intent so clearly that the reader never has to guess. Fix known issues adjacent to your current work rather than scoping around them. When you leave an area better than you found it, that is craftsmanship.",
  },
  {
    number: 3,
    name: "Architecture",
    tagline:
      "First make the change easy, then make the easy change. If something is hard, take a broader perspective to understand why.",
    body: "Difficulty is information about the architecture — when something resists change, zoom out to understand why before pushing through. When a change is hard, first restructure so the desired change becomes straightforward. This separates risk: preparatory restructuring preserves behavior while reorganizing; the actual change is then a simple, obvious edit — two safe steps instead of one risky leap.",
  },
  {
    number: 4,
    name: "Complexity",
    tagline:
      "Build deep modules with shallow interfaces. Scale is limited primarily by the ability to manage complexity. Every abstraction should make life easier, not harder. Be generous with what you consume, but strict with what you produce.",
    body: "Modules should encapsulate significant complexity behind small interfaces — push complexity into the module, not the caller. A function requiring many parameters, or an agent requiring a paragraph of setup in its spawn prompt, has an interface that is too shallow. On the communication boundary: accept varied inputs, tolerate ambiguity, interpret charitably; produce precise formats, all required fields, consistent structure. This asymmetry makes inter-agent communication robust.",
  },
  {
    number: 5,
    name: "Consistency",
    tagline:
      "Solve problems using the most reliable technique that solves the problem. Types are better than tests. Automated tests are better than manual tests. Scripts are better than agents. Code is better than docs.",
    body: "Each level of the hierarchy eliminates an entire class of failure mode: types rule out type errors before the code runs; tests catch logic errors before deployment; scripts remove non-determinism from processes entirely. The hierarchy is about narrowing the space where things can go wrong. Judgment still applies — if a type-level enforcement would be convoluted and a test expresses the invariant more clearly, use the test. Code is the source of truth; docs drift.",
  },
  {
    number: 6,
    name: "Safety",
    tagline:
      "Every step works. Every step compiles. Nothing breaks. Use safe refactor patterns even for local changes. If something goes wrong, investigate, and make sure that type of failure never happens again.",
    body: "Work in safe refactor patterns — no broken intermediate states, even for speed. Named patterns: Expand-contract (add new interface alongside old, migrate callers, remove old), Extract-then-modify (extract function/component, update references, then modify), Add-before-remove (add new column/field/route, update code, then remove old). When failures occur, trace root causes and add structural prevention — types, tests, process gates — so the same class of failure cannot recur.",
  },
] as const

export default function PrinciplesRoute() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Principles</PageTitle>
      </PageLayout.Header>

      <Tabs defaultValue="all">
        <PageLayout.Tabs>
          <TabsList>
            <PageTabsTrigger value="all" icon={<List />} label="All Principles" />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <TabsContent value="all">
            <PageTabHeader title="All Principles" />
            <ResponsiveColumns>
              {principles.map((p) => (
                <PanelCard
                  key={p.number}
                  id={`principle-${p.number}`}
                  title={`${p.number}. ${p.name}`}
                >
                  <div className="space-y-3">
                    <Heading variant="subsection-accent">{p.tagline}</Heading>
                    <p className="text-secondary text-sm">{p.body}</p>
                  </div>
                </PanelCard>
              ))}
            </ResponsiveColumns>
          </TabsContent>
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}

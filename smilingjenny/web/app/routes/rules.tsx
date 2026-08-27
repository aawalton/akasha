import type React from "react"
import { data } from "react-router"
import { Empty, Shell } from "~/components/shell"
import { listRules } from "~/lib/db.server"
import { requireJenny } from "~/lib/session.server"
import { ruleConditions, ruleOutcomes } from "~/lib/wording"
import type { Route } from "./+types/rules"

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = await requireJenny(request)
  return data({ rules: await listRules() }, { headers })
}

export default function Rules({ loaderData }: Route.ComponentProps) {
  const { rules } = loaderData

  if (rules.length === 0) {
    return (
      <Shell title="Rules">
        <Empty>No rules yet. Once one is set, it will be written out here in full.</Empty>
      </Shell>
    )
  }

  return (
    <Shell title="Rules">
      <div className="flex flex-col gap-4">
        {rules.map((rule) => (
          <section
            key={rule.slug}
            className="flex flex-col gap-3 rounded-lg border border-subtle px-4 py-4"
          >
            <h2 className="font-medium text-base text-primary">{rule.name}</h2>
            <Clauses
              lead="When"
              clauses={ruleConditions(rule)}
              absent="This rule does not say what to look for yet."
            />
            <Clauses
              lead="Then"
              clauses={ruleOutcomes(rule)}
              absent="This rule does not say what to do yet."
            />
          </section>
        ))}
      </div>
    </Shell>
  )
}

function Clauses({
  lead,
  clauses,
  absent,
}: {
  lead: string
  clauses: readonly string[]
  absent: string
}): React.ReactElement {
  if (clauses.length === 0) {
    return <p className="text-secondary text-sm italic">{absent}</p>
  }
  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium text-secondary text-xs uppercase tracking-wide">{lead}</p>
      <ul className="flex flex-col gap-1">
        {clauses.map((clause, index) => (
          <li key={clause} className="text-base text-primary">
            {index < clauses.length - 1 ? `${clause}, and` : clause}
          </li>
        ))}
      </ul>
    </div>
  )
}

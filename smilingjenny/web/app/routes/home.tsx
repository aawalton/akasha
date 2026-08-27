import { data } from "react-router"
import { Empty, Shell } from "~/components/shell"
import { countTransactions, listCategories } from "~/lib/db.server"
import { requireJenny } from "~/lib/session.server"
import type { Route } from "./+types/home"

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = await requireJenny(request)
  const [transactions, categories] = await Promise.all([countTransactions(), listCategories()])
  return data({ transactions, categoryCount: categories.length }, { headers })
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { transactions, categoryCount } = loaderData

  if (transactions === 0 && categoryCount === 0) {
    return (
      <Shell title="Overview">
        <Empty>
          Nothing has arrived yet. When transactions start coming in from Monarch, they will show up
          here.
        </Empty>
      </Shell>
    )
  }

  return (
    <Shell title="Overview">
      <dl className="grid grid-cols-1 gap-3">
        <Stat label="Transactions" value={transactions.toLocaleString("en-US")} />
        <Stat label="Categories" value={categoryCount.toLocaleString("en-US")} />
      </dl>
    </Shell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-subtle px-4 py-4">
      <dt className="text-secondary text-sm">{label}</dt>
      <dd className="font-semibold text-2xl text-primary tabular-nums">{value}</dd>
    </div>
  )
}

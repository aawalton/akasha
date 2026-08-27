import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type React from "react"
import { data } from "react-router"
import { Empty, money, readableDate, Shell } from "~/components/shell"
import { countTransactions, listTransactions } from "~/lib/db.server"
import { requireJenny } from "~/lib/session.server"
import { categorySourceSentence } from "~/lib/wording"
import type { Route } from "./+types/transactions"

const PAGE_SIZE = 50

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = await requireJenny(request)
  const url = new URL(request.url)
  const rawPage = Number(url.searchParams.get("page") ?? "1")
  const asked = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1
  const total = await countTransactions()
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(asked, lastPage)
  const transactions = await listTransactions(PAGE_SIZE, (page - 1) * PAGE_SIZE)
  return data({ transactions, total, page }, { headers })
}

export default function Transactions({ loaderData }: Route.ComponentProps) {
  const { transactions, total, page } = loaderData

  if (total === 0) {
    return (
      <Shell title="Transactions">
        <Empty>
          No transactions yet. Once Monarch starts sending them over, every one will be listed here
          with the category it was given.
        </Empty>
      </Shell>
    )
  }

  const hasPrevious = page > 1
  const hasNext = page * PAGE_SIZE < total

  return (
    <Shell title="Transactions">
      <div className="flex flex-col gap-5">
        <ul className="divide-y divide-subtle rounded-lg border border-subtle">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex flex-col gap-1.5 px-4 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-medium text-base text-primary">
                  {transaction.merchantName ?? transaction.title}
                </span>
                <span className="shrink-0 font-medium text-base text-primary tabular-nums">
                  {money(transaction.amount)}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-secondary text-sm">
                <span>{readableDate(transaction.date)}</span>
                {transaction.accountName !== null && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{transaction.accountName}</span>
                  </>
                )}
                {transaction.isPending && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Pending</span>
                  </>
                )}
              </div>
              <div>
                {transaction.categoryName === null ? (
                  <span className="text-secondary text-sm italic">No category yet</span>
                ) : (
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-primary text-sm ${surfaceClass(2)}`}
                  >
                    {transaction.categoryName}
                  </span>
                )}
              </div>
              {}
              {transaction.categoryName !== null && (
                <p
                  className={
                    transaction.categoryProvenance === null
                      ? "text-secondary text-sm italic"
                      : "text-primary text-sm"
                  }
                >
                  {categorySourceSentence(transaction.categoryProvenance)}
                </p>
              )}
              {transaction.notes !== null && transaction.notes !== "" && (
                <p className="text-secondary text-sm">{transaction.notes}</p>
              )}
            </li>
          ))}
        </ul>

        <nav className="flex items-center justify-between gap-3" aria-label="Pages">
          <PageLink to={`/transactions?page=${page - 1}`} enabled={hasPrevious}>
            Newer
          </PageLink>
          <span className="text-secondary text-sm tabular-nums">
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of{" "}
            {total.toLocaleString("en-US")}
          </span>
          <PageLink to={`/transactions?page=${page + 1}`} enabled={hasNext}>
            Older
          </PageLink>
        </nav>
      </div>
    </Shell>
  )
}

function PageLink({
  to,
  enabled,
  children,
}: {
  to: string
  enabled: boolean
  children: React.ReactNode
}) {
  if (!enabled) {
    return <span className="px-3 py-2 text-disabled text-sm">{children}</span>
  }
  return (
    <a className="rounded-md border border-subtle px-3 py-2 text-primary text-sm" href={to}>
      {children}
    </a>
  )
}

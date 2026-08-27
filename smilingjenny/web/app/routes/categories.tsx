import { data } from "react-router"
import { Empty, Shell } from "~/components/shell"
import { type CategoryRow, listCategories } from "~/lib/db.server"
import { requireJenny } from "~/lib/session.server"
import type { Route } from "./+types/categories"

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = await requireJenny(request)
  return data({ categories: await listCategories() }, { headers })
}

export default function Categories({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData

  if (categories.length === 0) {
    return (
      <Shell title="Categories">
        <Empty>No categories yet. They arrive with the first transactions.</Empty>
      </Shell>
    )
  }

  const groups = new Map<string, CategoryRow[]>()
  for (const category of categories) {
    const key = category.groupName ?? "Other"
    const existing = groups.get(key)
    if (existing === undefined) groups.set(key, [category])
    else existing.push(category)
  }

  return (
    <Shell title="Categories">
      <div className="flex flex-col gap-6">
        {[...groups.entries()].map(([group, rows]) => (
          <section key={group} className="flex flex-col gap-2">
            <h2 className="font-medium text-secondary text-sm uppercase tracking-wide">{group}</h2>
            <ul className="divide-y divide-subtle rounded-lg border border-subtle">
              {rows.map((category) => (
                <li key={category.slug} className="px-4 py-3 text-base text-primary">
                  {category.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Shell>
  )
}

import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type React from "react"
import { Form, NavLink } from "react-router"

export function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={`flex min-h-dvh flex-col ${surfaceClass(0)}`}>
      <header className="flex items-start justify-between gap-3 border-subtle border-b px-5 pt-6 pb-3">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-secondary text-sm">Smiling Jenny</p>
          <h1 className="font-semibold text-2xl text-primary">{title}</h1>
        </div>
        <Form method="post" action="/sign-out">
          <button
            type="submit"
            className="whitespace-nowrap text-secondary text-xs underline underline-offset-2"
          >
            Sign out
          </button>
        </Form>
      </header>
      <nav className="flex border-subtle border-b" aria-label="Sections">
        <Tab to="/">Overview</Tab>
        <Tab to="/categories">Categories</Tab>
        <Tab to="/transactions">Transactions</Tab>
        <Tab to="/rules">Rules</Tab>
      </nav>
      <main className="px-5 py-5">{children}</main>
    </div>
  )
}

function Tab({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        [
          "flex-1 whitespace-nowrap px-1 py-3 text-center text-xs",
          isActive ? "border-accent border-b-2 font-medium text-primary" : "text-secondary",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  )
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-subtle border-dashed px-5 py-10 text-center">
      <p className="text-base text-secondary">{children}</p>
    </div>
  )
}

export function money(amount: number | null): string {
  if (amount === null) return "—"
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount))
  return amount < 0 ? `−${formatted}` : formatted
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

export function readableDate(date: string | null): string {
  if (date === null) return ""
  const [year, month, day] = date.split("-")
  if (year === undefined || month === undefined || day === undefined) return date
  const monthName = MONTHS[Number(month) - 1]
  const dayNumber = Number(day)
  if (monthName === undefined || !Number.isInteger(dayNumber)) return date
  return `${monthName} ${dayNumber}, ${year}`
}

import { surfaceClass } from "@akasha/design-primitives/surface-class"
import type React from "react"
import { Form } from "react-router"

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
      <main className="px-5 py-5">{children}</main>
    </div>
  )
}

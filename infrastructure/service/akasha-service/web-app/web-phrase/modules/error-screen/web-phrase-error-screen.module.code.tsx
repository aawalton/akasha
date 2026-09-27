"use client"

import {
  PhrasesSeeded,
  useSeededPhrase,
} from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import type { SeededPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/seeding/web-phrase-seeding.module.code.ts"
import { errorScreenErrorTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/error-screen-error-title.web-phrase.ts"
import { errorScreenNotFound } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/error-screen-not-found.web-phrase.ts"
import { errorScreenNotFoundTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/error-screen-not-found-title.web-phrase.ts"
import { errorScreenOops } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/error-screen-oops.web-phrase.ts"
import { errorScreenUnexpected } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/error-screen-unexpected.web-phrase.ts"
import { webPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { isRouteErrorResponse, useRouteLoaderData } from "react-router"

const ROOT = "root"

const READ = [webPhrase.slug]

const NOT_FOUND = 404

const NO_PHRASES: readonly SeededPhrase[] = []

type Said = {
  readonly notFound?: string
  readonly wentWrong?: string
  readonly thrown?: string
}

function Screen({ error, said }: { error: unknown; said: Said }) {
  const phrase = useSeededPhrase()
  let title = phrase(said.thrown ?? errorScreenOops.slug)
  let details = phrase(said.wentWrong ?? errorScreenUnexpected.slug)
  let stack: string | undefined
  if (isRouteErrorResponse(error)) {
    const missing = error.status === NOT_FOUND
    title = phrase(missing ? errorScreenNotFoundTitle.slug : errorScreenErrorTitle.slug)
    if (missing) details = phrase(said.notFound ?? errorScreenNotFound.slug)
    else if (error.statusText !== "") details = error.statusText
  } else if (import.meta.env.DEV === true && error instanceof Error) {
    details = error.message
    stack = error.stack
  }
  return (
    <main className="mx-auto max-w-7xl p-4 pt-16">
      <h1>{title}</h1>
      <p>{details}</p>
      {stack === undefined ? null : (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

export function PhrasedErrorScreen({ error, said = {} }: { error: unknown; said?: Said }) {
  useLoaderFollowing(READ)
  const phrases =
    useRouteLoaderData<{ readonly phrases?: readonly SeededPhrase[] }>(ROOT)?.phrases ?? NO_PHRASES
  return (
    <PhrasesSeeded phrases={phrases}>
      <Screen error={error} said={said} />
    </PhrasesSeeded>
  )
}

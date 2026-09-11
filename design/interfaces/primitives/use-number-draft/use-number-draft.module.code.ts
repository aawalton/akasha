"use client"

import { type Dispatch, type SetStateAction, useState } from "react"

export type NumberDraft = {
  readonly editing: boolean
  readonly draft: string
  readonly setEditing: Dispatch<SetStateAction<boolean>>
  readonly setDraft: Dispatch<SetStateAction<string>>
  readonly edit: () => undefined
}

export function useNumberDraft(value: number): NumberDraft {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState("")

  function edit(): undefined {
    setDraft(String(value))
    setEditing(true)
  }

  return { editing, draft, setEditing, setDraft, edit }
}

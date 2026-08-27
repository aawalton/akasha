"use client"

import { Button } from "@shared/design-primitives/components/button"
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@shared/design-primitives/components/dialog"
import { Spinner } from "@shared/design-primitives/components/spinner"
import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import type { QuickAddConfig } from "@shared/pages-core/schema/quick-add"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { useState } from "react"
import type { PageWithProperties } from "../../supabase/types"
import { QuickAddForm } from "./quick-add-form"

const FORM_ID = "quick-add-form"

export interface CreatePageDialogProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly displayName: string
  readonly quickAdd: QuickAddConfig
  readonly propertyDefinitions: readonly PropertyDefinition[]
  readonly existingPages: readonly PageWithProperties[]
  readonly onCreate: (properties: Readonly<Record<string, ReadonlyJSONValue>>) => Promise<unknown>
  readonly onSubmitted?: () => void
}

export function CreatePageDialog(props: CreatePageDialogProps): React.ReactNode {
  const {
    open,
    onOpenChange,
    displayName,
    quickAdd,
    propertyDefinitions,
    existingPages,
    onCreate,
    onSubmitted,
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)

  const handleClose = () => {
    onOpenChange(false)
    setError(null)
    setIsLoading(false)
    setResetKey((k) => k + 1)
  }

  const handleSubmit = async (properties: Readonly<Record<string, ReadonlyJSONValue>>) => {
    setIsLoading(true)
    setError(null)
    try {
      await onCreate(properties)
      onSubmitted?.()
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) handleClose()
        else onOpenChange(true)
      }}
    >
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Create {displayName}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-2">
            <QuickAddForm
              key={resetKey}
              formId={FORM_ID}
              quickAdd={quickAdd}
              propertyDefinitions={propertyDefinitions}
              existingPages={existingPages}
              disabled={isLoading}
              onSubmit={(properties) => {
                void handleSubmit(properties)
              }}
            />
            {error !== null && (
              <p role="alert" className="text-secondary text-sm">
                {error}
              </p>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="tertiary" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="accent" type="submit" form={FORM_ID} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

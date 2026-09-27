"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { dialogCancel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-cancel.web-phrase.ts"
import { pageCreateButton } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-create-button.web-phrase.ts"
import { pageCreateCreating } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-create-creating.web-phrase.ts"
import { pageCreateTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-create-title.web-phrase.ts"
import { pageCreateUnknownError } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/page-create-unknown-error.web-phrase.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import type { QuickAddConfig } from "akasha/page/core/schema/modules/quick-add/quick-add.module.code.ts"
import { QuickAddForm } from "akasha/page/ui/component/modules/quick-add-form/quick-add-form.module.code.tsx"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { useState } from "react"

const FORM_ID = "quick-add-form"

interface CreatePageDialogProps {
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

  const phrase = usePhrase()
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
      setError(err instanceof Error ? err.message : phrase(pageCreateUnknownError.slug))
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
          <DialogTitle>{phrase(pageCreateTitle.slug, { name: displayName })}</DialogTitle>
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
            {phrase(dialogCancel.slug)}
          </Button>
          <Button variant="accent" type="submit" form={FORM_ID} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner />
                {phrase(pageCreateCreating.slug)}
              </>
            ) : (
              phrase(pageCreateButton.slug)
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

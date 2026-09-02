"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"dark"}
      className="toaster group"
      closeButton
      toastOptions={{
        classNames: {
          toast: `${surfaceClass(2)} border-none text-primary`,
          description: "text-secondary text-sm",
          error: `!${surfaceClass(2)} !text-secondary`,
          closeButton:
            "!left-auto !-right-2 !-top-2 !border-none !bg-transparent hover:!bg-primary/8 !w-8 !h-8",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
